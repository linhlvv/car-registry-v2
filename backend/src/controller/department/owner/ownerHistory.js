import pool from "../../../configs/connectDB";
// task - đang làm dở
let ownerHistory = async (req, res) => {
  let ownerid = req.body.ownerid;

  if (ownerid === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  let type = ""
  let queryType = ""
  let carType = ""
  let query = ""
  let convert = () => {
    type = carType === "expired" ? " < " : " >= ";
    queryType = carType === "registed"
        ? "re.date as registryDate"
        : "timestampdiff(month, re.date, re.expire) as duration"
    query = `
      select re.licenseId as license, v.brand, v.model, v.version, ` +
        queryType + `, re.expire, p.name, ce.name
        from registry re
      join vehicles v 
        on v.licenseId = re.licenseId
      join owner o 
        on v.ownerId = o.id
      join personal p
        on p.id = o.id
      join centre ce
        on ce.id = re.centreId
      where ownerId = ?
        and expire` + type + `current_date()
              union all 
      select re.licenseId as license, v.brand, v.model, v.version, ` +
        queryType + `, re.expire, c.name, ce.name
        from registry re
      join vehicles v 
        on v.licenseId = re.licenseId
      join owner o 
        on v.ownerId = o.id
      join company c 
        on c.id = o.id
      join centre ce
        on ce.id = re.centreId
      where ownerId = ?
        and expire` + type + `current_date()`
  }

  try {
    carType = "registed"
    convert()
    const [registRows, fields1] = await pool.query(query, [ownerid, ownerid])

    carType = "expired"
    convert()
    const [expireRows, fields2] = await pool.query(query, [ownerid, ownerid])
    return res.send({ registed: registRows, expired: expireRows })
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  ownerHistory
}
