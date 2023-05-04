import pool from "../../configs/connectDB";

let registModal = async (req, res) => {
  let registId = req.body.id

  let query = `
  select r.id, r.date, r.expire, c.name 
    from registry r
  join centre c
    on r.centreId = c.id
  where r.id = ?`

  const [rows, fields] = await pool.query(query, [registId])
  return res.send({data: rows})
}

module.exports = {
    registModal
}