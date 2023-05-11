import pool from "../../../configs/connectDB"

let allCity = async (req, res) => {
  let carType = req.body.carType
  
  if (carType === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }
  let type = carType === 'registed' ? ' >= ' : ' < '

  let query = `
  select name
  from vehicles v join
  (select re.licenseId as license, max(expire) as expire
  from registry re
  where centreId = ` + req.session.userid + `
  group by re.licenseId) ok
  on v.licenseId = ok.license
  join region r 
  on r.id = v.regionId
  and expire` + type + `current_date()
  group by name`
  
  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [rows, fields] = await pool.query(query, [req.session.userid])
    let cities = []
    for(let i = 0; i < rows.length; i++) {
      cities.push(rows[i].name)
    }
    return res.send({data: cities})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  allCity
}