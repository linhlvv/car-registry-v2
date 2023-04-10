import pool from "../../configs/connectDB"

let allBrand = async (req, res) => {
  let carType = req.body.carType
  
  let type = carType === 'registed' ? ' >= ' : ' < '

  let query = `
  select brand
  from registry re 
  join vehicles v
  on re.licenseId = v.licenseId
  where centreId = ?
  and expire` + type + `current_date()
  group by brand`;
  
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query, [req.session.userid])
  let brands = []
  for(let i = 0; i < rows.length; i++) {
    brands.push(rows[i].brand)
  }
  return res.send({data: brands})

}

module.exports = {
  allBrand
}