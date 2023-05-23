import pool from "../../../configs/connectDB";

// task - trả về tháng có nhiều đăng kiểm nhất của trung tâm
let getBurstyMonth = async (req, res) => {
  let centreId = req.body.centreId;
  if (centreId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let query = `
    SELECT (DATE_FORMAT(date, '%b')) as month, YEAR(date) as year, COUNT(*) as cnt
    FROM registry
    WHERE centreId = 453
    GROUP BY MONTH(date)
    ORDER BY cnt DESC
    LIMIT 1;
    `;
  let [result, fields] = await pool.query(query, centreId);
  return res.status(200).send({ data: result[0] });
};

module.exports = {
  getBurstyMonth,
};
