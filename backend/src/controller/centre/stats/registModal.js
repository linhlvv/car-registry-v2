import pool from "../../../configs/connectDB";

let registModal = async (req, res) => {
  let registId = req.body.id

  if (registId === undefined) {
    return res.status(422).send({message: 'Missing parameter!'})
  }
  let query = `
  select r.licenseId as licenseId, r.id, r.date, r.expire, c.name, v.brand, v.model, v.version
    from registry r
  join centre c
    on r.centreId = c.id
  join vehicles v
    on r.licenseId = v.licenseId
  where r.id = ?`

  try {
    const [rows, fields] = await pool.query(query, [registId])
    let licenseId = rows[0].licenseId;
    let getOwnerType = `select type 
    from owner o 
    join vehicles v 
    on o.id = v.ownerId
    where v.licenseId = ?`
  
    let ownerType = await pool.query(getOwnerType, licenseId)
    ownerType = ownerType[0][0].type
  
    let getOwnerInfo = `select name as ownerName from ${ownerType == 1 ? 'personal' : 'company'} where id = (select ownerId from vehicles where licenseId = ?)`
    let ownerInfo = await pool.query(getOwnerInfo, licenseId)
    let ownerName = ownerInfo[0][0]
    let data = Object.assign(rows[0], ownerName)
    return res.status(200).send({data})
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
    registModal
}