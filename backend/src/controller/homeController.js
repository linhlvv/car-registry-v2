require('dotenv').config()

import { authenticate } from './authenticate/authenticate';
import { logout } from './authenticate/logout';
import { verifyToken } from './authenticate/verifyToken';

import { centreInfo } from './info/centreInfo';
import { getDataForChart } from './info/data4Chart';
import { findByLicense } from './info/findByLicense';

import { expired } from './categories/expired';
import { registed } from './categories/registed';
import { vehicles } from './categories/vehicles';



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
  vehicles, registed, expired, findByLicense, getDataForChart
}
