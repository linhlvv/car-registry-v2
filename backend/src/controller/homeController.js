import pool from '../configs/connectDB';

let homePage = async (req, res) => {
  console.log(`Email: `, req.session.email)
  const [rows, fields] = await pool.query('select * from vehicles')
  return res.send(rows)
}

let authenticate = async (req, res) => {
  
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    let query = `select * from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [email, password]);
      
      if (result.length > 0) {
        req.session.email = email;
        console.log('Login success')
        res.send('Login success')
      } else {
        res.send('Incorrect email or Password!');
      }
      res.end();
    }
}

let logout = async (req, res) => {
  req.session.email = undefined;
  req.session.loggedin = false;
  console.log('Logout success')
  return res.redirect('/');
}

let vehicles = async (req, res) => {
  if (req.session.email === undefined) {
    return res.redirect('/')
  }
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
  if (req.body.page == '')
    console.log('ok')
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
  homePage, authenticate, logout, vehicles, centreInfo
}
