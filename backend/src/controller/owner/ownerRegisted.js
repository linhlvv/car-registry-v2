import pool from "../../configs/connectDB";

let ownerRegisted = async (req, res) => {
  let type = `select type from owner o where o.id = ?`
  const [rows, fields] = await pool.query(type, [req.body.id])

  let base = `select v.licenseId, certDate, brand, model, version, name
  from owner o 
  join vehicles v 
  on o.id = v.ownerId
  join registry r 
  on r.licenseId = v.licenseId `
  if (rows[0].type === 1) {
    let query = base + `join personal p on o.id = p.id where o.id = ?`
    console.log(query)
    const [rows, fields] = await pool.query(query, [req.body.id])
    return res.send({data: rows})
  } 
  else {
    let query = base + `join company c on o.id = c.id where o.id = ?`
    console.log(query)
    const [rows, fields] = await pool.query(query, [req.body.id])
    return res.send({data: rows})
  }
}

module.exports = {
  ownerRegisted
}