import pool from "../../configs/connectDB"

let exactBrand = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let carType = req.body.carType
  let brand = req.body.brand
  
  let type = carType === 'registed' ? ' >= ' : ' < '
  
  let count = `
  select count(*) from registry re
join vehicles v
on re.licenseId = v.licenseId
  where (brand, re.licenseId, expire) in
  (select v.brand as brand, v.licenseId as license, max(expire) as expire
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  where centreId = ?
  group by v.licenseId)  
  and expire` + type + `current_date()
  and brand = ?`
  const [countRows, countFields] = await pool.query(count, [req.session.userid, brand])
  

  let query = `
  select re.licenseId as license, v.brand, v.model, v.version, re.date as registryDate, re.expire, p.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
  and expire` + type + `current_date()
  and brand = "` + brand + `"
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, re.date as registryDate, re.expire, c.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
  and expire` + type + `current_date()
  and brand = "` + brand + `"
    order by license
    limit ? offset ?`
  
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})

}

module.exports = {
  exactBrand
}