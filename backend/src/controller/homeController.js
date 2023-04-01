require('dotenv').config()

import pool from '../configs/connectDB';
import  {authenticate} from './auth/authenticate';
import  {verifyToken} from './auth/verifyToken';
import  {logout} from './auth/logout';

import {centreInfo} from './info/centreInfo';
import {findByLicense} from './info/findByLicense';



let homepage = async (req, res) => {
  console.log(req.session.id === undefined ? `Session: ` : `\x1b[4mSession\x1b[0m: `, req.session.id)
  console.log(req.session.userid === undefined ? `Userid: ` : `\x1b[4mUserid\x1b[0m: `, req.session.userid)
  console.log(req.session.token === undefined ? `Token: ` : `\x1b[4mToken\x1b[0m: `, req.session.token)

  return res.send([{session: req.session.id,
                    userid: req.session.userid, 
                    token: req.session.token}])
}


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

let registed = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let count = `select count(*) as total
  from vehicles v 
  left join registry re
  on re.licenseId = v.licenseId
  where expire >= CURRENT_DATE()`
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
    where expire >= CURRENT_DATE()
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
    where expire >= CURRENT_DATE()
    order by licenseId
    limit ? offset ?`

  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                    resPerPage * (page - 1)])
  return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

let unregisted = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let count = `select count(*) as total
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  where expire is null`
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
    where expire is null
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
    where expire is null
    order by licenseId
    limit ? offset ?`

  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

let expired = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let count = `select count(*) as total
  from vehicles v
  left join registry re
  on re.licenseId = v.licenseId
  where expire < CURRENT_DATE()`
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
    where expire < CURRENT_DATE()
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
    where expire < CURRENT_DATE()
    order by licenseId
    limit ? offset ?`

  const [rows, fields] = await pool.query(query, [resPerPage, 
                                                  resPerPage * (page - 1)])
  return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
  homepage, authenticate, verifyToken, logout, centreInfo, 
  vehicles, registed, unregisted, expired, findByLicense
}
