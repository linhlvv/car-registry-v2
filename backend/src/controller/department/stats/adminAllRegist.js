import pool from "../../../configs/connectDB";

// task - viết hàm trả về tất cả giấy đăng kiểm của trung tâm 
// input: centreId,no of page, number of pages
// output: tất cả giấy đăng kiểm của trung tâm đó

let adminAllRegist = async (req, res) => {
	let resPerPage = parseInt(req.body.resPerPage)
	let page = parseInt(req.body.page) 
	if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1
		
	let placeholder = [req.body.name, req.body.name,
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
		placeholder = [resPerPage, resPerPage * (page - 1)]
	
  let count = `
  select count(*) as total
    from registry r
	join vehicles v
		on r.licenseId = v.licenseId` + join + `
	where 1 = 1` + filter

	let query = `
	select r.id, r.licenseId, brand, model, version, date, expire, 
			p.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId`
			+ join + `
	join personal p 
			on v.ownerId = p.id
	where 1 = 1` + filter + `
					union all
	select r.id, r.licenseId, brand, model, version, date, expire, 
			c.name as name, (expire < CURRENT_DATE()) as status
	from registry r
	join vehicles v 
			on r.licenseId = v.licenseId`
			+ join + `
	join company c 
			on v.ownerId = c.id
	where 1 = 1` + filter + `
	order by licenseId
			limit ? offset ?`


	try {
		let [countRows, countFields] = await pool.query(count, req.body.name)
		const [rows, fields] = await pool.query(query, placeholder)
		return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
	}
	catch (err) {
		console.log(err);
		return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
	}
}

module.exports = {
    adminAllRegist
}