import pool from "../../../configs/connectDB";

// task - trả về tổng regist từng centre

let getRankByRegist = async (req, res) => {
    let centreId = req.body.centreId
    if (centreId === undefined) {
        return res.status(422).send({message: 'Missing parameter!'})
    }

    let getAllCentreId = `select id from centre`
    let [allCentreId, fields] = await pool.query(getAllCentreId)

    let getCntRegistPerCentre = 
    `
    SELECT RANK() OVER (ORDER BY COUNT(*) DESC) AS rank, centreId, COUNT(*) AS registrationCount
    FROM registry
    GROUP BY centreId
    ORDER BY registrationCount DESC;
    `
}   