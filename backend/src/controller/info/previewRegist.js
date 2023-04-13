import pool from "../../configs/connectDB";
// task - Preview Regist 
// input - license Id
// output - regist Id, Regist Date, Expire Date

let previewRegist = async (req, res) => {
    let licenseId = req.body.licenseId
    let centreId = req.session.userid
    
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
    
    // logic - lấy tên trung tâm đăng kiểm hiện tại
    let getCentreName = 'select name from centre where id = ?'
    let centreName = await pool.query(getCentreName, [centreId])
    centreName = centreName[0][0].name


    return res.send({id, registDate, expireDate, centreName})
    
}

module.exports = {
    previewRegist
}
