import pool from "../../../configs/connectDB"

let viewRegistedVehicles = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1
  
  let filter = ''
  let placeholder = [resPerPage, resPerPage * (page - 1)]
  if (req.body.filter === 'region') {
    filter = `
    and r.name = ?`
    placeholder = [req.body.name, req.body.name,
      resPerPage, resPerPage * (page - 1)]
  }
  else if (req.body.filter === 'centre') {
    filter = `
    and c.name = ?`
    placeholder = [req.body.name, req.body.name, 
      resPerPage, resPerPage * (page - 1)]
  }

  let count = `
  select count(*) as total from registry
  where (licenseId, expire) in
  (select v.licenseId as license, max(expire) as expire
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  join centre c
    on c.id = re.centreId
  join region r
    on r.id = v.regionId` + filter + `
  group by v.licenseId)  
  and expire >= current_date()`
  
  let query = `
  select re.licenseId as license, v.brand, v.model, v.version, 
    re.date as registryDate, re.expire, p.name, (re.expire >= current_date()) as status
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
    join centre c
      on c.id = re.centreId
    join region r
      on r.id = v.regionId` + filter + `
    group by re.licenseId)  
  and expire >= current_date()
          union all 
  select re.licenseId as license, v.brand, v.model, v.version,
    re.date as registryDate, re.expire, c.name, (re.expire >= current_date()) as status
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
    join centre c
      on c.id = re.centreId
    join region r
      on r.id = v.regionId` + filter + `
    group by re.licenseId)  
  and expire >= current_date()
    order by license
    limit ? offset ?`

  try {
    const [countRows, countFields] = await pool.query(count, req.body.name)
    const [rows, fields] = await pool.query(query, placeholder)
    return res.send({data: rows, countData: countRows[0].total, 
                                          countPage: Math.ceil(countRows[0].total / resPerPage)})
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  viewRegistedVehicles
}