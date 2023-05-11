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

	let [countRows, countFields] = await pool.query('select count(*) as total from registry where centreId = ?', req.session.userid)

	let centreId = req.session.userid
	// query lấy về licenseId, Tên xe bao gồm brand, model, version ; regist date, expire date, và tên chủ sở hữu(tên công ty nếu type = 0, tên cá nhân nếu type = 1 )
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

	const [rows, fields] = await pool.query(query, [resPerPage, 
																									resPerPage * (page - 1)])
	return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
    allRegist
}