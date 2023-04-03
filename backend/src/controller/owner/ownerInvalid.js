import pool from "../../configs/connectDB";

let ownerInvalid = async (req, res) => {
  let type = `select type from owner o where o.id = ?`
  const [rows, fields] = await pool.query(type, [req.body.id])

  let join = ''

  if(rows[0].type === 1) {
    join = `join personal p on o.id = p.id`
  }
  else {
    join = `join company c on o.id = c.id`
  }

  let query = `select v.licenseId, certDate, brand, model, version, name
  from owner o 
  join vehicles v 
  on o.id = v.ownerId
  join registry r 
  on r.licenseId = v.licenseId ` + join + 
  ` where o.id = ? and 
  (r.expire < current_date() or r.expire is null)`
  
  const [rows1, fields1] = await pool.query(query, [req.body.id])
  return res.send({data: rows1})
}

module.exports = {
  ownerInvalid
}