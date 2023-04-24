require('dotenv').config()

import { authenticate } from './authenticate/authenticate';
import { logout } from './authenticate/logout';
import { verifyToken } from './authenticate/verifyToken';

import { centreInfo } from './info/centreInfo';
import { getDataForChart } from './info/data4Chart';
import { detailModal } from './info/detailModal';
import { previewRegist } from './info/previewRegist';
import { newRegist } from './info/newRegist';
import { updateModify } from './info/updateModify';
import { previewInfo } from './info/previewInfo'

import { expired } from './categories/expired';
import { registed } from './categories/registed';
import { vehicles } from './categories/vehicles';
import { findByLicense} from './categories/findByLicense';

import { owner } from './filter/owner'
import { brand } from './filter/brand'
import { allBrand } from './filter/allBrand'
import { exactBrand } from './filter/exactBrand'
import { time } from './filter/time'
import { allCity } from './filter/allCity'
import { exactCity } from './filter/exactCity'

import { ownerInfo } from './owner/ownerInfo';
import { registHistory } from './owner/registHistory';


import { changePassword } from './authenticate/changePassword';

import { insertCentre } from './admin/insertCentre';
import { removeCentre } from './admin/removeCentre';
import { addDataFromExcel } from './admin/addDataFromExcel'

import { allRegist } from './stats/allRegist'
import { registByTime } from './stats/registByTime'
import { registByLicense } from './stats/registByLicense'

import { forecast } from './forecast/forecast'

import { viewAllCentres } from './department/viewAllCentres';
import { viewAllVehicles } from './department/viewAllVehicles';
import { viewRegistedVehicles } from './department/viewRegistedVehicles';

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
  vehicles, registed, expired, findByLicense, detailModal, getDataForChart,
  ownerInfo, registHistory, owner, brand, allBrand, exactBrand, time, allCity, exactCity,
  changePassword, insertCentre, removeCentre, newRegist, previewRegist, updateModify, previewInfo,
  allRegist, registByTime, forecast, registByLicense,
  viewAllCentres, viewAllVehicles, viewRegistedVehicles,
  addDataFromExcel
}
