import pool from '../../../configs/connectDB';

//TODO - View tất cả xe 

let viewAllVehicles = async (req, res) => {
  if (req.session.authority !== 1) 
		return res.sendStatus(403)
  
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let count = `
  select count(*) as total from registry
  where (licenseId, expire) in
  (select v.licenseId as license, max(expire) as expire
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  group by v.licenseId)`
  const [countRows, countFields] = await pool.query(count)
  
  let query = `
  select re.licenseId as license, v.brand, v.model, v.version,
          re.date as regist, re.expire, p.name, (re.expire >= current_date()) as status
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
    group by re.licenseId)
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, 
          re.date as regist, re.expire, c.name, (re.expire >= current_date()) as status
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
    group by re.licenseId)
    order by license
    limit ? offset ?`

    console.log(query);

  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, countData: countRows[0].total, 
                                countPage: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
  viewAllVehicles
}