require('dotenv').config()

import pool from '../configs/connectDB';
import  {authenticate} from './auth/authenticate';
import  {verifyToken} from './auth/verifyToken';
import  {logout} from './auth/logout';

import {centreInfo} from './info/centreInfo';
import {findByLicense} from './info/findByLicense';

import {vehicles} from './categories/vehicles';
import {registed} from './categories/registed';
import {unregisted} from './categories/unregisted';
import {expired} from './categories/expired';

import {ownerRegisted} from './owner/ownerRegisted';

let homepage = async (req, res) => {
  console.log(req.session.id === undefined ? `Session: ` : `\x1b[4mSession\x1b[0m: `, req.session.id)
  console.log(req.session.userid === undefined ? `Userid: ` : `\x1b[4mUserid\x1b[0m: `, req.session.userid)
  console.log(req.session.token === undefined ? `Token: ` : `\x1b[4mToken\x1b[0m: `, req.session.token)

  return res.send([{session: req.session.id,
                    userid: req.session.userid, 
                    token: req.session.token}])
}

module.exports = {
  homepage, authenticate, verifyToken, logout, centreInfo, 
  vehicles, registed, unregisted, expired, findByLicense,
  ownerRegisted
}
