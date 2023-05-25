import pool from "../../../configs/connectDB"

let adminRegistByArea = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  if (req.body.area === undefined)
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  let area = req.body.area

  let find =`
  select count(*) as total
    from registry r
  join vehicles v
    on r.licenseId = v.licenseId
  join region re
    on v.regionId = re.id
	where re.name = ?`

	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join personal p 
			on v.ownerId = p.id
	join region re
			on v.regionId = re.id
	where re.name = ?
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join company c 
			on v.ownerId = c.id
	join region re
			on v.regionId = re.id
	where re.name = ?
	order by licenseId asc
			limit ? offset ?`


	try {
		let [countRows, countFields] = await pool.query(find, [area])
		const [rows, fields] = await pool.query(query, [area, area,
                                                  resPerPage, resPerPage * (page - 1)])
		return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
	}
	catch (err) {
		return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
	}
}

module.exports = {
  adminRegistByArea
}