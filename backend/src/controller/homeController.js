require('dotenv').config()

import crypto from 'crypto';
import { query } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../configs/connectDB';

let homepage = async (req, res) => {
  console.log(req.session.id === undefined ? `Session: ` : `\x1b[4mSession\x1b[0m: `, req.session.id)
  console.log(req.session.userid === undefined ? `Userid: ` : `\x1b[4mUserid\x1b[0m: `, req.session.userid)
  console.log(req.session.token === undefined ? `Token: ` : `\x1b[4mToken\x1b[0m: `, req.session.token)

  return res.send([{session: req.session.id,
                    userid: req.session.userid, 
                    token: req.session.token}])
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
        const payload = {
          email: req.session.email,
          id: req.session.userid
        }
        const authToken = jwt.sign(payload, process.env.SECRET, {expiresIn: '20000000000000s'})
        req.session.token = authToken
        console.log('\t\t\x1b[4mLogin succeeded\x1b[0m')
        res.send({token: authToken})
      } else {
        console.log('Login failed')
        res.end();
      }
    }
}

let verifyToken = (req, res, next) => {
  const token = req.get('Authorization') || req.session.token;
  if (!token) return res.sendStatus(401)
  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.user = verified
    next()
  }
  catch (err) {
    console.log(err)
    return res.sendStatus(403)
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
  return res.send(rows)
}

let findByLicense = async (req, res) => {
  let licenseId = req.body.licenseId
  
}

module.exports = {
  homepage, authenticate, logout, centreInfo, 
  vehicles, registried, unregistried, expire, verifyToken
}
