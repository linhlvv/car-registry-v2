import pool from "../../configs/connectDB"

let vehicles = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let count = `select count(*) as total from vehicles`
  const [countRows, countFields] = await pool.query(count)

  let query = `
  select v.licenseId, certDate, 
  o.type, v.brand, v.model, v.version, p.name as owner,
    case 
      when expire >= CURRENT_DATE() then true
        else false
    end as valid
      from vehicles v 
    join region r 
      on v.regionId = r.id 
    join owner o 
      on v.ownerId = o.id
    join personal p
      on p.id = o.id
    left join registry re
      on re.licenseId = v.licenseId
          union all
  select v.licenseId, certDate, 
  o.type, v.brand, v.model, v.version, c.name as owner,
    case
      when expire >= CURRENT_DATE() then true
        else false
    end as valid
      from vehicles v
    join region r
      on v.regionId = r.id
    join owner o
      on v.ownerId = o.id
    join company c
      on c.id = o.id
    left join registry re
      on re.licenseId = v.licenseId
    order by licenseId
    limit ? offset ?`
  
  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
  vehicles
}