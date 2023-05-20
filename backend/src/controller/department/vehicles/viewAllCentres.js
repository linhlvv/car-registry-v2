import pool from '../../../configs/connectDB';

//TODO - Viết hàm view tất cả center

let viewAllCentres = async (req, res) => {
	if (req.session.authority !== 1) 
		return res.sendStatus(403)

	let query = 'select c.*, a.email from centre c natural join account a'
	const [rows, fields] = await pool.query(query)
	return res.send({data: rows})
}

module.exports = {
    viewAllCentres
}
