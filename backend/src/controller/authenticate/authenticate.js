import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../../configs/connectDB';

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

module.exports = {
  authenticate
}