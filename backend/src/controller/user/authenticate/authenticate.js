import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../../../configs/connectDB';

let validateEmail = (email) => {
  let regex = /^([A-Za-z]|[0-9])+@registrytotal\.com$/
  return regex.test(email)
}

let authenticate = async (req, res) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  if (!validateEmail(req.body.email)) {
    return res.status(422).send({ErrorCode: 'ER_INVALID_EMAIL'})
  }
  let email = req.body.email;
  let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  if (email && password) {
    let query = `select email, id, type from account where email = ? and password = ?`;
    let [result] = await pool.execute(query, [email, password]);
      
      if (result.length > 0) {
        req.session.email = email;
        req.session.userid = result[0].id;
        req.session.authority = result[0].type;
        const payload = {
          email: req.session.email,
          id: req.session.userid,
          authority: req.session.authority
        }
        const authToken = jwt.sign(payload, process.env.SECRET, {expiresIn: '20000000000000s'})
        req.session.token = authToken
        console.log('\t\t\x1b[4mLogin succeeded\x1b[0m')

        res.status(200).send({token: authToken, type: result[0].type, id: result[0].id})
      } else {
        console.log('Login failed')
        res.status(400).send('Login failed');
      }
    }
}

module.exports = {
  authenticate
}