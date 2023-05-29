import pool from "../../../configs/connectDB"

let viewUnregistedVehicles = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let count = `
  SELECT COUNT(*) as total FROM vehicles 
    v WHERE v.licenseId
  NOT IN (SELECT registry.licenseId FROM registry)`
  const [countRows, countFields] = await pool.query(count)
  
  let query = `
  SELECT licenseId as license, brand, model, version, 
    modified, manafractureDate as manufracture, p.name 
    FROM vehicles v 
  JOIN owner o 
    on v.ownerId = o.id
  JOIN personal p 
    on v.ownerId = p.id
  WHERE v.licenseId NOT IN 
    (SELECT registry.licenseId FROM registry)
    UNION ALL
  SELECT licenseId as license, brand, model, version, 
    modified, manafractureDate as manufracture, c.name 
    FROM vehicles v 
  JOIN owner o 
    on v.ownerId = o.id
  JOIN company c 
    on v.ownerId = c.id
  WHERE v.licenseId NOT IN 
    (SELECT registry.licenseId FROM registry)
    limit ? offset ?`

  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                    resPerPage * (page - 1)])
  return res.send({data: rows, countData: countRows[0].total, 
                                          countPage: Math.ceil(countRows[0].total / resPerPage)})
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