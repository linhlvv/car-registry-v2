import pool from "../../configs/connectDB";
// task - Preview Regist 
// input - license Id
//output - regist Id, Regist Date, Expire Date

let previewRegist = async (req, res) => {
    let licenseId = req.body.licenseId
    let modDate = req.body.modifyDate
    
    //Kiểm tra ngày sửa chữa
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    let sixMonthsAgo = currentDate.toISOString().slice(0, 10);

    let date = new Date();
    let registDate = date.toISOString().slice(0, 10);
    let query = 'select modifyDate from vehicles where licenseId = ?'
    let modifyDate = await pool.query(query,[licenseId])
    modifyDate = modifyDate[0][0].modifyDate
    let expireDate = new Date();
    if (modifyDate == null) {
        expireDate.setMonth(date.getMonth() + 18)

    }
    if (modifyDate > sixMonthsAgo) {
        expireDate.setMonth(date.getMonth() + 12)
    }
    else {
        expireDate.setMonth(date.getMonth() + 6)
    }
    expireDate = expireDate.toISOString().slice(0, 10);
    let findId = 'SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = \'car_regist\' AND TABLE_NAME = \'registry\''
    let id = await pool.query(findId)
    id = id[0][0].AUTO_INCREMENT
    
    return res.send({id, registDate, expireDate})
    
}

module.exports = {
    previewRegist
}
