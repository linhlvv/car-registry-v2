import pool from '../configs/connectDB';

let test = async (req, res) => {
  let ans = req.body;
  return res.send(ans)
}

let homePage = async (req, res) => {
  console.log(`req.session: ${JSON.stringify(req.session.id)}`);
  console.log(`session home ${JSON.stringify(req.session)} ${req.session.email}`);
  const [rows, fields] = await pool.query('select * from vehicles')
  return res.send(rows)
  
}

let authenticate = async (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    let query = `select * from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [email, password]);
      console.log(result);
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        console.log(`req.session: ${JSON.stringify(req.session.id)}`);
        console.log(`session ${JSON.stringify(req.session)} ${req.session.email}`);
        res.send(result)
      } else {
        res.send({ loginErr: 'Incorrect email or Password!' });
      }
      res.end();
    }
}

let logout = async (req, res) => {
  req.session.email = undefined;
  req.session.loggedin = false;
}

let centreInfo = async (req, res) => {
  if (req.session.email === undefined) {
    console.log('deo co req.session.email');
  }
  let query = `select c.* from account a
  join centre c
  on c.id = a.id
  where
  a.email = ?`
  const [rows, fields] = await pool.query(query, [req.session.email])
  console.log(rows);
  return res.send(rows)
}

module.exports = {
  homePage, authenticate, logout, test, centreInfo
}