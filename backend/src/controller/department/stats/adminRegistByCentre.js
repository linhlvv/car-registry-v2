import pool from "../../../configs/connectDB"

let adminRegistByCentre = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  if (req.body.centre === undefined)
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  let centre = req.body.centre

  let find =`
  select count(*) as total
    from registry r
  join centre ce
    on ce.id = r.centreId
  where ce.name = ?`

	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join personal p 
			on v.ownerId = p.id
  join centre ce
      on ce.id = r.centreId
	where ce.name = ?
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join company c 
			on v.ownerId = c.id
  join centre ce
      on ce.id = r.centreId
	where ce.name = ?
	order by date desc
			limit ? offset ?`


	try {
		let [countRows, countFields] = await pool.query(find, [centre])
		const [rows, fields] = await pool.query(query, [centre, centre,
                                                  resPerPage, resPerPage * (page - 1)])
		return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
	}
	catch (err) {
		return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
	}
}

module.exports = {
  adminRegistByCentre
}