import pool from "../../../configs/connectDB"

let registByTime = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let year = parseInt(req.body.year)
  let month = parseInt(req.body.month)
  let quarter = parseInt(req.body.quarter)

  let order = req.body.order === "asc" ? "asc" : "desc"

  if (year === undefined || month === undefined || quarter === undefined || order === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  
  let match = ''
  if(!isNaN(year)) {
    match += `\nand year(date) = ` + year
  }
  if(!isNaN(month)) {
    match += `\nand month(date) = ` + month
  }
  else if(!isNaN(quarter)) {
    match += `\nand month(date) > ` + (quarter - 1) * 3 +
            `\nand month(date) <= ` + quarter * 3 
  }

  let count = `
  select count(*) as total
    from registry re
  where centreId = ` + req.session.userid + match + `
  `
  let query = `
  select r.id, r.licenseId, brand, model, version, date, expire, 
    p.name as name, (expire < CURRENT_DATE()) as status
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join personal p 
    on v.ownerId = p.id
  where centreId = ` + req.session.userid + match + ` 
        union all
  select r.id, r.licenseId, brand, model, version, date, expire, 
    c.name as name, (expire < CURRENT_DATE()) as status
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join company c 
    on v.ownerId = c.id
  where centreId = ` + req.session.userid + match + ` 
  order by date ` + order + `
    limit ? offset ?`
  
  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [countRows, countFields] = await pool.query(count, [req.session.userid])
    const [rows, fields] = await pool.query(query, [resPerPage, 
                                                    resPerPage * (page - 1)])
    return res.send({data: rows, countPage: Math.ceil(countRows[0].total / resPerPage)})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
  
}

module.exports = {
  registByTime
}