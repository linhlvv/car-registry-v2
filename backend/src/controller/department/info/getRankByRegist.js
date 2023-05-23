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
    SELECT 
    CONCAT(
    RANK() OVER (ORDER BY COUNT(*) DESC),
    CASE 
      WHEN RANK() OVER (ORDER BY COUNT(*) DESC) % 10 = 1 AND RANK() OVER (ORDER BY COUNT(*) DESC) % 100 != 11 THEN 'st'
      WHEN RANK() OVER (ORDER BY COUNT(*) DESC) % 10 = 2 AND RANK() OVER (ORDER BY COUNT(*) DESC) % 100 != 12 THEN 'nd'
      WHEN RANK() OVER (ORDER BY COUNT(*) DESC) % 10 = 3 AND RANK() OVER (ORDER BY COUNT(*) DESC) % 100 != 13 THEN 'rd'
      ELSE 'th'
    END
    ) AS 'rank',
    centreId,
    COUNT(*) AS count
    FROM registry
    GROUP BY centreId
    ORDER BY count DESC;

    `
    let [cntRegistPerCentre, fields2] = await pool.query(getCntRegistPerCentre)
    
    let result = []

    let cntRegistPerCentreArr = []
    for (let i = 0; i < cntRegistPerCentre.length; i++) {
        if (cntRegistPerCentre[i].centreId === centreId) {
            result = {
                rank: cntRegistPerCentre[i].rank.toString(),
                count: cntRegistPerCentre[i].count
            }
        }
        
    }
    
    
    return res.status(200).send({data: result});

}

module.exports = {
    getRankByRegist
}