import pool from "../../../configs/connectDB"

let validateCode = (code) => {
  let taxnum = /^[0-9]{3}\-[0-9]{3}\-[0-9]{3}$/gm
  let ssn = /^[0-9]{4}\-[0-9]{4}\-[0-9]{3}$/gm

  return ssn.test(code) || taxnum.test(code)
}

let owner = async (req, res) => {
  let carType = req.body.carType
  let code = req.body.code

  if (carType === undefined || code === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  if (!validateCode(code)) {
    return res.status(422).send({ErrorCode: 'ER_INVALID_PARAM'})
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
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
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
    where centreId = ` + req.session.userid +
  `  group by re.licenseId)  
  and expire` + type + `current_date()
  and taxnum = ?
    order by license`
  // bug - đã test call api ngon lành ko vấn đề gì
  try {
    const [rows, fields] = await pool.query(query, [code, code])
    return res.send({data: rows})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  owner
}