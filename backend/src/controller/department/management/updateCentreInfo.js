import pool from "../../../configs/connectDB";
import crypto from 'crypto';

// input - centreID, các thông tin được thay đổi
// output - cập nhật thông tin mới
// task - thay đổi thông tin centre 
let updateCentreInfo = async (req, res) => {
    let centreId = req.body.centreId;
    let city = req.body.city;
    let district = req.body.district;
    let password = crypto.createHash('sha256').update(req.body.password).digest('hex');

    if (centreId === undefined || city === undefined || district === undefined || password === undefined) {
        return res.status(422).send({message: 'Missing parameter!'})
    }
    let updateCentre = 
    `
    UPDATE centre 
    SET city = '${city}', 
    district = '${district}'
    WHERE id = '${centreId}'
    `;
    let updateAccount = 
    `
    UPDATE account
    SET password = '${password}'
    WHERE id = '${centreId}'
    `;
    await pool.query(updateCentre);
    await pool.query(updateAccount);
    return res.status(200).send({message: 'Update successfully!'});
}

module.exports = {
    updateCentreInfo
}