import pool from "../../configs/connectDB";

// task - viết hàm trả về tất cả giấy đăng kiểm của trung tâm 
// input: centreId,no of page, number of pages
// output: tất cả giấy đăng kiểm của trung tâm đó

let allRegist = async (req, res) => {
    let resPerPage = parseInt(req.body.resPerPage)
    let page = parseInt(req.body.page) 
    if (resPerPage === undefined)
        resPerPage = 10
    if (page === undefined)
        page = 1

    let centreId = req.session.userid
    // query lấy về licenseId, Tên xe bao gồm brand, model, version ; regist date, expire date, và tên chủ sở hữu(tên công ty nếu type = 0, tên cá nhân nếu type = 1 )
    let query = 'SELECT r.licenseId, brand, model, version, date, expire, p.name as name, (expire < CURRENT_DATE()) as status FROM registry r JOIN vehicles v on r.licenseId = v.licenseId JOIN personal p on v.ownerId = p.id \
    union all \
    SELECT r.licenseId, brand, model, version, date, expire, c.name as name, (expire < CURRENT_DATE()) as status FROM registry r JOIN vehicles v on r.licenseId = v.licenseId JOIN company c on v.ownerId = c.id ORDER BY `licenseId` ASC\
    limit ? offset ?'
    

    const [rows, fields] = await pool.query(query, [centreId,[resPerPage, 
        resPerPage * (page - 1)]])
    return res.send({data: rows, count: Math.ceil(countRows[0].total / resPerPage)})
}

module.exports = {
    allRegist
}