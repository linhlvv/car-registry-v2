import pool from "../../../configs/connectDB"

let adminFilterOwner = async (req, res) => {
  let carType = req.body.carType
  let code = req.body.code

  if (carType === undefined || code === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }
  
  // logic - dùng code thay cho ssn vì có cả taxnum nữa
  let type = carType === 'registed' ? ' >= ' : ' < '

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
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    group by re.licenseId)  
  and expire` + type + `current_date()
  and ssn = ?
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` + queryType + `, re.expire, c.name
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
  and expire` + type + `current_date()
  and taxnum = ?
    order by license`
  const [rows, fields] = await pool.query(query, [code, code])
  return res.send({data: rows})
}

module.exports = {
  adminFilterOwner
}