import pool from "../../../configs/connectDB";

// task - viết hàm trả về tất cả giấy đăng kiểm của trung tâm 
// input: centreId,no of page, number of pages
// output: tất cả giấy đăng kiểm của trung tâm đó

let allRegist = async (req, res) => {
	let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

	let count = `
	select count(*) as total from registry where centreId = ?`

	let centreId = req.session.userid
	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join personal p 
			on v.ownerId = p.id
	where centreId = ` + centreId + ` 
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId
	join company c 
			on v.ownerId = c.id
	where centreId = ` + centreId + ` 
	order by licenseId
			limit ? offset ?`

	try {
		let [countRows, countFields] = await pool.query(count, req.session.userid)
		const [rows, fields] = await pool.query(query, [resPerPage, 
			resPerPage * (page - 1)])
		return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
	}
	catch (err) {
		return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
	}
}

module.exports = {
    allRegist
}