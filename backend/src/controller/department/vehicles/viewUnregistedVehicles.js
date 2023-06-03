import pool from "../../../configs/connectDB"

let viewUnregistedVehicles = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let filter = ''
  let placeholder = [resPerPage, resPerPage * (page - 1)]
  if (req.body.filter === 'region') {
    filter = `
    and r.name = ?`
    placeholder = [req.body.name, req.body.name,
      resPerPage, resPerPage * (page - 1)]
  }
  else if (req.body.filter === 'centre') {
    return res.status(200).send({data: [], countData: 0, countPage: 0})
  }

  let count = `
  SELECT COUNT(*) as total 
    FROM vehicles v 
  join region r
    on r.id = v.regionId
  WHERE v.licenseId
    NOT IN (SELECT registry.licenseId FROM registry)` + filter
  
  let query = `
  SELECT licenseId as license, brand, model, version, 
    modified, manafractureDate as manufracture, p.name 
    FROM vehicles v 
  JOIN owner o 
    on v.ownerId = o.id
  JOIN personal p 
    on v.ownerId = p.id
  join region r
    on r.id = v.regionId
  WHERE v.licenseId NOT IN 
    (SELECT registry.licenseId FROM registry) ` + filter + `
    UNION ALL
  SELECT licenseId as license, brand, model, version, 
    modified, manafractureDate as manufracture, c.name 
    FROM vehicles v 
  JOIN owner o 
    on v.ownerId = o.id
  JOIN company c 
    on v.ownerId = c.id
  join region r
    on r.id = v.regionId
  WHERE v.licenseId NOT IN 
    (SELECT registry.licenseId FROM registry) ` + filter + `
    limit ? offset ?`

  try {
    const [countRows, countFields] = await pool.query(count, req.body.name)
    const [rows, fields] = await pool.query(query, placeholder)
    return res.send({data: rows, countData: countRows[0].total, 
                                            countPage: Math.ceil(countRows[0].total / resPerPage)})  
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  viewUnregistedVehicles
}

/*
SELECT licenseId, brand, model, version, modified, manafractureDate as manufracture, p.name 
FROM vehicles v 
JOIN owner o on v.ownerId = o.id
JOIN personal p on v.ownerId = p.id
WHERE v.licenseId NOT IN (SELECT registry.licenseId FROM registry)
UNION ALL
SELECT licenseId, brand, model, version, modified, manafractureDate as manufracture, c.name 
FROM vehicles v 
JOIN owner o on v.ownerId = o.id
JOIN company c on v.ownerId = c.id
WHERE v.licenseId NOT IN (SELECT registry.licenseId FROM registry)
*/