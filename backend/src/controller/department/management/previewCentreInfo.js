import pool from "../../../configs/connectDB";

// input - centreId
// output - thông tin của centre đó
// task - preview centre info and account of that centre
let previewCentreInfo = async (req, res) => {
  let centreId = req.body.centreId;
  if (centreId === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let query = `
    SELECT *
    FROM centre c
    WHERE c.id = ?
    `;
  const [rows, fields] = await pool.query(query, [centreId]);
  return res.send(rows);
};

module.exports = {
  previewCentreInfo,
};
