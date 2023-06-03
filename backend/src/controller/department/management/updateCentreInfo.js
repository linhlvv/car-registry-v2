import crypto from "crypto";
import pool from "../../../configs/connectDB";

// input - centreID, các thông tin được thay đổi
// output - cập nhật thông tin mới
// task - thay đổi thông tin centre
let updateCentreInfo = async (req, res) => {
  let centreId = req.body.centreId;
  let city = req.body.city;
  let district = req.body.district;
  let password = undefined;
  if (req.body.password !== undefined) {
    password = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
  }

  if (centreId === undefined || city === undefined || district === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let updateCentre = `
    UPDATE centre 
    SET city = ?, 
    district = ?
    WHERE id = ?
    `;
  let updateAccount = `
    UPDATE account
    SET password = ?
    WHERE id = ?
    `;
  await pool.query(updateCentre, [city, district, centreId]);
  if (password !== undefined) {
    await pool.query(updateAccount, [password, centreId]);
  }
  return res.status(200).send({ message: "Update successfully!" });
};

module.exports = {
  updateCentreInfo,
};
