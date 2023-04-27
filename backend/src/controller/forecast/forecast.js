import pool from "../../configs/connectDB"

let forecast = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let match = `\nand year(expire) = ` + year
            + `\nand month(expire) = ` + month
            + `\nand expire >= CURRENT_DATE()`

  let count = `
  select count(*) as total
    from registry re
  where centreId = ` + req.session.userid + match + `
  `
  const [countRows, countFields] = await pool.query(count, [req.session.userid])

  let query = `
  select r.licenseId, brand, model, version, date, expire, 
    p.name as name, (expire >= CURRENT_DATE()) as status
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join personal p 
    on v.ownerId = p.id
  where centreId = ` + req.session.userid + match + `
        union all
  select r.licenseId, brand, model, version, date, expire, 
    c.name as name, (expire >=CURRENT_DATE()) as status
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join company c 
    on v.ownerId = c.id
  where centreId = ` + req.session.userid + match + ` 
  order by expire asc
    limit ? offset ?`
  
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, countData: countRows[0].total, countPage: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
  forecast
}