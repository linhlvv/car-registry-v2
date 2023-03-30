import pool from '../configs/connectDB';
import crypto from 'crypto'

let homepage = async (req, res) => {
  console.log(`Session ID: `, req.session.id)
  console.log(`Session Email: `, req.session.email)
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
  
}

let vehicles = async (req, res) => {
  const [rows1, fields1] = await pool.query(`select count(licenseId)
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
where
o.type = 1
and 
r.id = ?;`, [req.body.area])
  console.log(req.body)
  let num = rows1[0]['count(licenseId)'] / req.body.result
  
  
  const [rows2, fields2] = await pool.query(`select license, region, owner, area from (
    select  v.licenseId as license, r.name as region, r.id as area, p.name as owner,
    ntile(?) over(order by v.licenseId) as tile_nr
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
where
o.type = 1
and
r.id = ?
) x
where x.tile_nr = ?;`, [num,  req.body.area, req.body.page])
  return res.send({count: num*req.body.result,result: rows2})
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

module.exports = {
  authenticate, logout, vehicles, centreInfo, homepage
}
