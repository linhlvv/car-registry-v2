import pool from "../../../configs/connectDB"

let validateLicense = (licenseId) => {
	let regex = /^[0-9]\d[A-Z]\-\d\d\d\.\d\d$/gm
	return regex.test(licenseId)
}

let adminRegistByLicense = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

	if (req.body.licenseId === undefined)
		return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
	if (!validateLicense(req.body.licenseId))
		return res.status(422).send({ErrorCode: 'ER_INVALID_LICENSE'})

  let licenseId = req.body.licenseId

	let placeholder = [licenseId, req.body.name,
										licenseId, req.body.name, 
										resPerPage, resPerPage * (page - 1)]
  let filter = ``
  let join = ``

  if (req.body.filter === 'centre') {
    join = `\njoin centre ce
            on r.centreId = ce.id\n`
    filter = `\nand ce.name = ?`
  }
  else if (req.body.filter === 'region') {
    join = `\njoin region re
            on v.regionId = re.id\n`
    filter = `\nand re.name = ?`
  }
  else
    placeholder = [licenseId, licenseId,
									resPerPage, resPerPage * (page - 1)]

  let find =`
  select count(*) as total 
    from registry r
	join vehicles v
		on r.licenseId = v.licenseId`
			+ join + ` 
  where r.licenseId = ?` + filter

	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
		on r.licenseId = v.licenseId`
			+ join + `
	join personal p 
			on v.ownerId = p.id
	where r.licenseId = ?`
			+ filter + `
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
		on r.licenseId = v.licenseId`
			+ join + `
	join company c 
			on v.ownerId = c.id
	where r.licenseId = ?`
			+ filter + `
	order by expire desc
			limit ? offset ?`


	try {
		let [countRows, countFields] = await pool.query(find, [licenseId, req.body.name])
		const [rows, fields] = await pool.query(query, placeholder)
		return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
	}
	catch (err) {
		console.log(err);
		return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
	}
}

module.exports = {
  adminRegistByLicense
}