import pool from "../../../configs/connectDB";

// task - trả về tháng có nhiều đăng kiểm nhất của centre
let getBurstyMonth = async (req, res) => {
    let centreId = req.body.centreId;
    let year = req.body.year;
    if (centreId === undefined || year === undefined) {
        return res.status(422).send({message: 'Missing parameter!'})
    }

    let query = 
    `
    SELECT MONTH(date) as month, COUNT(*) as cnt
    FROM registry
    WHERE centreId = ? AND YEAR(date) = ?
    GROUP BY MONTH(date)
    ORDER BY cnt DESC
    LIMIT 1
    `;
    let [result, fields] = await pool.query(query, [centreId, year]);
    return res.status(200).send({message: 'Success', data: result[0]});
}