import pool from "../../configs/connectDB"

// task - Tạo đăng kiểm mới
// input - info xe + owner
// output - check thông tin xe và trả về thông tin đăng kiểm

let newRegist = async(req, res) => {

    //car data
    let licenseId = req.body.licenseId


    //regist data
    let id = req.body.id;
    let registDate = req.body.registDate
    let expireDate = req.body.expireDate
    let centreId = req.session.userid


    // logic - nếu licenseId đã có trong db thì chỉ add vào registry

    let check = 'select * from vehicles where licenseId = ?'
    const [rows, fields] = await pool.query(check, [licenseId])
    if (rows.length > 0) {
        let query = 'insert into registry (`id`, `date`, `expire`, `centreId`, `licenseId`) values (?, ?, ?, ?, ?)' 
        await pool.query(query, [id, registDate, expireDate, centreId, licenseId])
        res.status(200).send('Regist successfully!')
    }
    else {
        res.status(400).send('Vehicle does not exist!')
    }
    // else {
        
    //     // logic - lấy id của owner mới được thêm vào, là personal hoặc company
    //     let ownerId = 0

    //     if (ownerType == 1) {
    //         let name = req.body.name
    //         let address = req.body.address
    //         let dob = req.body.dob
    //         let ssn = req.body.ssn
    //         let phone = req.body.phone

    //         let insertPresonal = 'insert into personal (`dob`,`ssn`,`name`,`address`,`phone`) values (?, ?, ?, ?, ?)'
    //         await pool.query(insertPresonal, [dob, ssn, name, address, phone])

    //         let getOwnerId = 'select id from personal where name = ?'
    //         const [o_ids, o_fields] = await pool.query(getOwnerId, [name])
    //         ownerId = o_ids[0].id
    //     }
    //     else if (ownerType == 0) {
    //         let companyName = req.body.companyName
    //         let companyAddress = req.body.companyAddress
    //         let companyPhone = req.body.companyPhone
    //         let companyTax = req.body.companyTax

    //         let insertCompany = 'insert into company (`address`, `phone`, `name`, `taxnum`) values (?, ?, ?, ?)'
    //         await pool.query(insertCompany, [companyAddress, companyPhone, companyName, companyTax])
            

    //         let getOwnerId = 'select id from company where name = ?'
    //         const [o_ids, o_fields] = await pool.query(getOwnerId, [companyName])
    //         ownerId = o_ids[0].id
    //     }
        
    //     //modifyDate != null => modified = 1
    //     if (modifyDate != null) {
    //         let modified = 1
    //     }
    //     else {
    //         let modified = 0
    //     }

        


    //     let query = 'insert into vehicles (licenseId, regionId, ownerId, manufractureDate, brand, model, version, certId, certDate, modified, modifyDate, ownerType) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' 
    //     await pool.query(query, [licenseId, regionId, ownerId, manuDate, brand, model, version, certId, certDate, modified, modifyDate, ownerType])
    //     let query2 = 'insert into registry (`id`, `date`, `expire`, `centreId`, `licenseId`) values (NULL, ?, ?, ?, ?)' 
    //     await pool.query(query, [registDate, expireDate, centreId, licenseId])
    //     res.status(200).send('Regist successfully!')
    // }
        



}

module.exports = {
    newRegist
}