import pool from '../../configs/connectDB';

//TODO - View tất cả xe 

let viewAllCars = async (req, res) => {
    let query = 'select * from vehicles'
    const [rows, fields] = await pool.query(query)
    return res.send(rows)
}

module.exports = {
    viewAllCars
}
