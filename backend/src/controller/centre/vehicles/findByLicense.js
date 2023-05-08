import pool from "../../../configs/connectDB"

let findByLicense = async (req, res) => {
  let carType = req.body.carType
  let license = req.body.license

  if (carType === undefined || license === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }

  let type = carType === 'expired' ? ' < ' : ' >= '
  let queryType = carType === 'registed' 
                              ? 're.date as registryDate'
                              : 'timestampdiff(month, re.date, re.expire) as duration'

  let query = `
  select re.licenseId as license, v.brand, v.model, v.version, ` + queryType + `, max(re.expire) as expire, p.name
    from registry re 
  join vehicles v 
    on re.licenseId = v.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  where expire` + type + `current_date()
    and centreId = '` + req.session.userid +
    `' and re.licenseId = '` + license +
  `' group by license
    union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` + queryType + `, max(re.expire) as expire, c.name
    from registry re 
  join vehicles v 
    on re.licenseId = v.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c
    on c.id = o.id
  where expire` + type + `current_date()
    and centreId = '` + req.session.userid +
    `' and re.licenseId = '` + license +
  `' group by license`

  const [result, fields] = await pool.query(query)
  return res.send({car: result})

}

module.exports = {
  findByLicense
}