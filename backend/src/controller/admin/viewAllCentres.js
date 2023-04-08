import pool from '../../configs/connectDB';

//TODO - Viết hàm view tất cả center

let viewAllCentres = async (req, res) => {
    let query = 'select * from centre'
    const [rows, fields] = await pool.query(query)
    return res.send(rows)
}

module.exports = {
    viewAllCentres
}
