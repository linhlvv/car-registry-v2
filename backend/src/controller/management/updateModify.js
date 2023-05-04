import pool from "../../configs/connectDB";

// task - Update modification date 
// input - licenseId, modifyDate
// output - check modifyDate trong db, update vào db hoặc thông báo lỗi
let updateModify = async (req, res) => {
    
    let licenseId = req.body.licenseId;
    let modifyDate = req.body.modifyDate;
    let getOldModifyDate = 'select modifyDate from vehicles where licenseId = ?'
    let oldModifyDate = await pool.query(getOldModifyDate, [licenseId])
    oldModifyDate = oldModifyDate[0][0].modifyDate
    if (modifyDate < oldModifyDate) {
        res.status(400).send('New modification date can\'t not be  older than before!')
    }
    else {
        let update = 'update vehicles set modified = ? , modifyDate = ? where licenseId = ?'
        await pool.query(update, ['1',modifyDate, licenseId])
        res.status(200).send('Update modification date successfully!')
    }
}

module.exports = {
    updateModify
}