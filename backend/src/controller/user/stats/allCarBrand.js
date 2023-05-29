import pool from "../../../configs/connectDB"

let allCarBrand = async (req, res) => {
  let query = `
  select distinct concat(brand, ' ', model, ' ', version) 
    as name 
  from vehicles
    order by name
  `
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query)
  
  let brands = []
  for(let i = 0; i < rows.length; i++) {
    brands.push(rows[i].name)
  }
  return res.send({areas: brands})

}

module.exports = {
  allCarBrand
}