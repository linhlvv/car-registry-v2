import pool from "../../../configs/connectDB";

let centreInfo = async (req, res) => {
  if (req.session.email === undefined) {
    return res.redirect("/");
  }
  let query = `select c.* from account a
  join centre c
  on c.id = a.id
  where
  a.email = ?`;
  const [rows, fields] = await pool.query(query, [req.session.email]);
  return res.send(rows);
};

module.exports = {
  centreInfo,
};
