import pool from '../configs/connectDB';

let test = async (req, res) => {
  let ans = req.body;
  return res.send(ans)
}

let homePage = async (req, res) => {
  if (req.session.email === undefined) {
    return res.send(`<form action="/test" method="POST">
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname"><br><br>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname"><br><br>
    <input type="submit" value="Submit">
  </form>`
    )
  }
  else{
    const [rows, fields] = await pool.query('select * from vehicles')
    return res.send(rows)
  }
  
}

let authenticate = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  if (email && password) {
    let query = `select * from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [email, password]);
      
      if (result.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/');
      } else {
        res.send({ loginErr: 'Incorrect Username or Password!' });
      }
      res.end();
    }
}

let logout = async (req, res) => {
  req.session.email = undefined;
  req.session.loggedin = false;
  return res.redirect('/');
}

module.exports = {
  homePage, authenticate, logout, test 
}
