import pool from "../../../configs/connectDB"

let adminViewAllBrand = async (req, res) => {
  let carType = req.body.carType
  
  if (carType === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }
  
  let type = carType === 'registed' ? ' >= ' : ' < '

  let query = `
  select brand 
  from vehicles v join
  (select re.licenseId as license, max(expire) as expire
  from registry re
  group by re.licenseId) ok
  on v.licenseId = ok.license
  and expire ` + type + ` current_date()
  group by brand;`
  
  // bug - đã gọi được api kết quả trả về chính xác
  const [rows, fields] = await pool.query(query, [req.session.userid])
  let brands = []
  for(let i = 0; i < rows.length; i++) {
    brands.push(rows[i].brand)
  }
  return res.send({data: brands})

}

module.exports = {
  adminViewAllBrand
}