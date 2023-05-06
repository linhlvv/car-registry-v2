require("dotenv").config();

import { verifyToken } from "./verifyToken";

// section - user
  // section - authenticate
import { authenticate } from "./user/authenticate/authenticate";
import { logout } from "./user/authenticate/logout";
import { changePassword } from "./user/authenticate/changePassword";
  // section - info
import { centreInfo } from "./user/info/centreInfo";
import { getDataForChart } from "./user/info/data4Chart";
import { detailModal } from "./user/info/detailModal";
import { previewInfo } from "./user/info/previewInfo";
  // section - owner
import { ownerInfo } from "./user/owner/ownerInfo";

// section - centre
  // section - filter
import { allBrand } from "./centre/filter/allBrand";
import { allCity } from "./centre/filter/allCity";
import { brand } from "./centre/filter/brand";
import { exactBrand } from "./centre/filter/exactBrand";
import { exactCity } from "./centre/filter/exactCity";
import { owner } from "./centre/filter/owner";
import { time } from "./centre/filter/time";
  // section - forecast
import { forecast } from "./centre/forecast/forecast";
  // section - info
import { previewRegist } from "./centre/info/previewRegist";
import { viewLatestRegist } from "./centre/info/viewLatestRegist";
  // section - management
import { newRegist } from "./centre/management/newRegist";
import { updateModify } from "./centre/management/updateModify";
  // section - owner
import { registHistory } from "./centre/owner/registHistory";
  // section - stats
import { allRegist } from "./centre/stats/allRegist";
import { registByLicense } from "./centre/stats/registByLicense";
import { registByTime } from "./centre/stats/registByTime";
import { registModal } from "./centre/stats/registModal";
  // section - vehicles
import { expired } from "./centre/vehicles/expired";
import { findByLicense } from "./centre/vehicles/findByLicense";
import { registed } from "./centre/vehicles/registed";
import { vehicles } from "./centre/vehicles/vehicles";

// section - department
  // section - management
import { addDataFromExcel } from "./department/management/addDataFromExcel";
import { insertCentre } from "./department/management/insertCentre";
import { removeCentre } from "./department/management/removeCentre";
  // section - vehicles
import { viewAllCentres } from "./department/vehicles/viewAllCentres";
import { viewAllVehicles } from "./department/vehicles/viewAllVehicles";
import { viewExpiredVehicles } from "./department/vehicles/viewExpiredVehicles";
import { viewRegistedVehicles } from "./department/vehicles/viewRegistedVehicles";
import { viewUnregistedVehicles } from "./department/vehicles/viewUnregistedVehicles";

let homepage = async (req, res) => {
  console.log(
    req.session.id === undefined ? `Session: ` : `\x1b[4mSession\x1b[0m: `,
    req.session.id
  );
  console.log(
    req.session.userid === undefined ? `Userid: ` : `\x1b[4mUserid\x1b[0m: `,
    req.session.userid
  );
  console.log(
    req.session.token === undefined ? `Token: ` : `\x1b[4mToken\x1b[0m: `,
    req.session.token
  );

  return res.send([
    {
      session: req.session.id,
      userid: req.session.userid,
      token: req.session.token,
    },
  ]);
};

module.exports = {
  homepage,
  authenticate,
  verifyToken,
  logout,
  centreInfo,
  vehicles,
  registed,
  expired,
  findByLicense,
  detailModal,
  getDataForChart,
  ownerInfo,
  registHistory,
  owner,
  brand,
  allBrand,
  exactBrand,
  time,
  allCity,
  exactCity,
  changePassword,
  insertCentre,
  removeCentre,
  newRegist,
  previewRegist,
  updateModify,
  previewInfo,
  allRegist,
  registByTime,
  forecast,
  registByLicense,
  registModal,
  viewAllCentres,
  viewAllVehicles,
  viewRegistedVehicles,
  viewExpiredVehicles,
  viewUnregistedVehicles,
  addDataFromExcel,
  viewLatestRegist,
};
