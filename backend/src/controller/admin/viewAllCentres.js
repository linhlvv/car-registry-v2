import pool from '../../configs/connectDB';

//TODO - Viết hàm view tất cả center

let viewAllCentres = async (req, res) => {
    let query = 'select * from centre c join account a on c.id = a.id'
    const [rows, fields] = await pool.query(query)
    return res.send(rows)
}

module.exports = {
    viewAllCentres
}
