import pool from "../../../configs/connectDB"

let registByLicense = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let licenseId = req.body.licenseId
  let centreId = req.session.userid

  let find =`
  select count(*) as total 
    from registry 
  where centreId = ?
    and licenseId = ?`
	let [countRows, countFields] = await pool.query(find, [centreId, licenseId])

	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join personal p 
			on v.ownerId = p.id
	where centreId = ?
    and r.licenseId = ?
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join company c 
			on v.ownerId = c.id
	where centreId = ?
    and r.licenseId = ?
	order by expire desc
			limit ? offset ?`

	const [rows, fields] = await pool.query(query, [centreId, licenseId, 
                                                  centreId, licenseId,
                                                  resPerPage, resPerPage * (page - 1)])
	return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
  registByLicense
}