import pool from '../configs/connectDB';

let homePage = async (req, res) => {
  console.log(`Email: `, req.session.email)
  if (req.session.email === undefined) {
    return res.send(`<form action="/auth" method="POST">
    <label>Email:</label>
    <input type="text" id="email" name="email"><br><br>
    <label>Password:</label>
    <input type="text" id="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>`
    )
  }
  else{
    const [rows, fields] = await pool.query('select * from vehicles')
    return res.send(`<form action="/logout" method="get">
                      <input type="submit" value="Logout">
                      </form>
                      <form action="/vehicles" method="get">
                      <input type="submit" value="Vehicles">
                      </form>
                      <form action="/centre-info" method="get">
                      <input type="submit" value="Info">
                      </form>`
                      )
  }
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
        res.redirect('/')
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
  const [rows, fields] = await pool.query(`select 
  v.licenseId as license,
  r.name as region,
  p.name as owner
  from vehicles v 
join region r 
  on v.regionId = r.id 
join owner o 
  on v.ownerId = o.id 
join personal p
  on o.id = p.id
where
o.type = 1;`)
  return res.send(rows)
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
