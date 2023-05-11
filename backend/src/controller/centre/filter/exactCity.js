import pool from "../../../configs/connectDB"

let exactCity = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let carType = req.body.carType
  let city = req.body.city
  
  if (carType === undefined || city === undefined || resPerPage === undefined || page === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }
  
  let type = carType === 'registed' ? ' >= ' : ' < '
  
  let count = `
  select count(*) as total from registry re
join vehicles v
on re.licenseId = v.licenseId
join region r
on r.id = v.regionId
  where (brand, re.licenseId, expire) in
  (select v.brand as brand, v.licenseId as license, max(expire) as expire
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  where centreId = ?
  group by v.licenseId)  
  and expire` + type + `current_date()
  and name = ?`
  
  let queryType = carType === 'registed' 
                              ? 're.date as registryDate'
                              : 'timestampdiff(month, re.date, re.expire) as duration'

  let query = `
  select re.licenseId as license, v.brand, v.model, v.version, ` + queryType + `, re.expire, p.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  join region r 
    on v.regionId = r.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
  and expire` + type + `current_date()
  and r.name = "` + city + `"
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` + queryType + `, re.expire, c.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  join region r 
    on v.regionId = r.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
  and expire` + type + `current_date()
  and r.name = "` + city + `"
    order by license
    limit ? offset ?`
  
  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [countRows, countFields] = await pool.query(count, [req.session.userid, city])
    const [rows, fields] = await pool.query(query, [resPerPage, 
      resPerPage * (page - 1)])
    return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
  

}

module.exports = {
  exactCity
}