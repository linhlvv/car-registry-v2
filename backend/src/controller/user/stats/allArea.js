import pool from "../../../configs/connectDB"

let allArea = async (req, res) => {
  let query = `
    select name
      from region
    order by name asc
  `
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query)
  
  let cities = []
  for(let i = 0; i < rows.length; i++) {
    cities.push(rows[i].name)
  }
  return res.send({areas: cities})

}

module.exports = {
  allArea
}