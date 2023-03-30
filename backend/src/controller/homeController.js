import pool from '../configs/connectDB';
import crypto from 'crypto'
import { query } from 'express';

let homepage = async (req, res) => {
  console.log(`Session ID: `, req.session.id)
  console.log(`Session User ID: `, req.session.userid)

  return res.send([{id: req.session.id}])
}

let authenticate = async (req, res) => {
  let email = req.body.email;
  let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  if (email && password) {
    let query = `select email, id from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [email, password]);
      
      if (result.length > 0) {
        req.session.email = email;
        req.session.userid = result[0].id;
        console.log('Login success')
        res.send(result)
      } else {
        console.log('Login failed')
        res.end();
      }
    }
}

let logout = async (req, res) => {
  req.session.destroy();
  res.end()
}

let centreInfo = async (req, res) => {
  if (req.session.email === undefined) {
    return res.redirect('/')
  }
  let query = `select c.* from account a
  join centre c
  on c.id = a.id
  where
  a.email = ?`
  const [rows, fields] = await pool.query(query, [req.session.email])
  return res.send(rows)
}

let vehicles = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let query = `
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, p.name as owner,
    case 
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, c.name as owner,
    case
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  return res.send(rows)
}

let registried = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1

  let query = `
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, p.name as owner,
    case 
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, c.name as owner,
    case
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  return res.send(rows)
}

let unregistried = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page)
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1
  
  let query = `
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, p.name as owner,
    case 
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, c.name as owner,
    case
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  return res.send(rows)
}

let expire = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage)
  let page = parseInt(req.body.page) 
  if (resPerPage === undefined)
    resPerPage = 10
  if (page === undefined)
    page = 1
  
  let query = `
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, p.name as owner,
    case 
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  select v.licenseId, certId, certDate, r.name as region,
  o.type, v.brand, v.model, v.version, c.name as owner,
    case
      when expire >= CURRENT_DATE() then true
        else false
    end as status
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
  return res.send(rows)
}

module.exports = {
  homepage, authenticate, logout, centreInfo, 
  vehicles, registried, unregistried, expire
}
