import pool from '../../configs/connectDB';

//TODO - Viết hàm view tất cả center

let viewAllCenters = async (req, res) => {
    let query = 'select * from center'
    const [rows, fields] = await pool.query(query)
    return res.send(rows)
}

module.exports = {
    viewAllCenters
}
