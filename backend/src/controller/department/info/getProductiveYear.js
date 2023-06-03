import pool from "../../../configs/connectDB";

// task - trả về năm có nhiều đăng kiểm nhất của trung tâm
let getProductiveYear = async (req, res) => {
  let centreId = req.body.centreId;
  if (centreId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let query = `
    SELECT YEAR(date) as year, COUNT(*) as cnt
    FROM registry
    WHERE centreId = ?
    GROUP BY YEAR(date)
    ORDER BY cnt DESC
    LIMIT 1
    `;
  let [result, fields] = await pool.query(query, [centreId]);
  return res.status(200).send({ data: result[0] });
};

module.exports = {
  getProductiveYear,
};
