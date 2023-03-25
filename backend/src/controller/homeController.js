import pool from '../configs/connectDB';

let homePage = async (req, res) => {
  if (req.session.username === undefined) {
    return res.send('')
  }
  else{
    const [rows, fields] = await pool.query('select * from vehicles')
    return res.send(rows)
  }
  
}

let authenticate = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  
  if (username && password) {
    let query = `select * from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [username, password]);
      
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/');
      } else {
        res.send({ loginErr: 'Incorrect Username or Password!' });
      }
      res.end();
    }
}

let logout = async (req, res) => {
  req.session.username = undefined;
  req.session.loggedin = false;
  return res.redirect('/');
}

module.exports = {
  homePage, logout, authenticate
}