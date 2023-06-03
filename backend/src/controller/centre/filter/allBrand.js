import pool from "../../../configs/connectDB"

let allBrand = async (req, res) => {
  let carType = req.body.carType
  
  if (carType === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  
  let type = carType === 'registed' ? ' >= ' : ' < '

  let query = `
  select brand 
  from vehicles v join
  (select re.licenseId as license, max(expire) as expire
  from registry re
  where centreId = ` + req.session.userid + `
  group by re.licenseId) ok
  on v.licenseId = ok.license
  and expire ` + type + ` current_date()
  group by brand;`
  
  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [rows, fields] = await pool.query(query, [req.session.userid])
    let brands = []
    for(let i = 0; i < rows.length; i++) {
      brands.push(rows[i].brand)
    }
    return res.send({data: brands})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
  /*
  try {

  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
  */
}

module.exports = {
  allBrand
}