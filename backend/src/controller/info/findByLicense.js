import pool from "../../configs/connectDB"

let findByLicense = async (req, res) => {
  let licenseId = req.body.licenseId
  let base = `select r.id AS r_id, r.name as r_name, v.*, `

  let type = `select type 
  from owner o 
  join vehicles v 
  on o.id = v.ownerId
  where v.licenseId = ?`
  const [rows, fields] = await pool.query(type, [licenseId])

  if (rows[0].type === 1) {
    let query = base + ` p.* from vehicles v left join region r on v.regionId = r.id JOIN personal p on v.ownerId = p.id WHERE v.licenseId = ?`
    const [rows, fields] = await pool.query(query, [licenseId])
    return res.send({data: rows, ownerType: 1})
  }
  else {
    let query = base + ` c.* from vehicles v left join region r on v.regionId = r.id JOIN company c on v.ownerId = c.id WHERE v.licenseId = ?`
    const [rows, fields] = await pool.query(query, [licenseId])
    return res.send({data: rows, ownerType: 0})
  }
}

module.exports = {
  findByLicense
}