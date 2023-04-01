import pool from "../../configs/connectDB"

let findByLicense = async (req, res) => {
  let licenseId = req.body.licenseId
  let base = `select * from vehicles v join `

  let type = `select type 
  from owner o 
  join vehicles v 
  on o.id = v.ownerId
  where v.licenseId = ?`
  const [rows, fields] = await pool.query(type, [licenseId])

  if (rows[0].type === 1) {
    let query = base + `personal p 
    on v.ownerId = p.id
    where v.licenseId = ?`
    const [rows, fields] = await pool.query(query, [licenseId])
    return res.send({data: rows, ownerType: 1})
  }
  else {
    let query = base + `company c 
    on v.ownerId = c.id
    where v.licenseId = ?`
    const [rows, fields] = await pool.query(query, [licenseId])
    return res.send({data: rows, ownerType: 0})
  }
}

module.exports = {
  findByLicense
}