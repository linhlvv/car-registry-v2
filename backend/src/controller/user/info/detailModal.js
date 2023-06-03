import pool from "../../../configs/connectDB";


//TODO - Viết lại hàm này để trả về thông tin của xe theo licenseId


let detailModal = async (req, res) => {
  let licenseId = req.body.licenseId;


  if (licenseId === undefined) {
    return res.status(422).send({ message: "Missing parameter!" });
  }


  let base = `select r.id AS r_id, r.name as r_name, v.*, `;
  let regist = `SELECT r.id, r.date, r.expire as expire, c.name FROM vehicles v LEFT JOIN registry r ON r.licenseId = v.licenseId LEFT JOIN centre c ON r.centreId = c.id where r.licenseId = ?`;
  const [rows2, fields2] = await pool.query(regist, [licenseId]);


  let unregist = `SELECT * FROM vehicles v WHERE v.licenseId NOT IN (SELECT registry.licenseId from registry) and v.licenseId = ?`
  const [rows3, fields3] = await pool.query(unregist, [licenseId]);
  // Nếu trả về null
  if (rows2.length <= 0 && rows3.length <= 0) {
    return res.status(400).send("No data received!");
  } else {
    let date = new Date().toISOString().slice(0, 10);
    let expired = rows2.length > 0 ? rows2[rows2.length - 1].expire > date : false;

    let nullptr = {
      id: null,
      date: null,
      expire: null,
      name: null,
      
    }
    let type = `select type 
    from owner o 
    join vehicles v 
    on o.id = v.ownerId
    where v.licenseId = ?`;
    const [rows, fields] = await pool.query(type, [licenseId]);


    if (rows[0].type === 1) {
      let query =
        base +
        ` p.* from vehicles v left join region r on v.regionId = r.id JOIN personal p on v.ownerId = p.id WHERE v.licenseId = ?`;
      const [rows, fields] = await pool.query(query, [licenseId]);
      return res.send({
        data: rows,
        data2: rows2.length > 0 ? rows2[rows2.length - 1] : nullptr,
        valid: expired,
        ownerType: 1,
      });
    } else {
      let query =
        base +
        ` c.* from vehicles v left join region r on v.regionId = r.id JOIN company c on v.ownerId = c.id WHERE v.licenseId = ?`;
      const [rows, fields] = await pool.query(query, [licenseId]);
      return res.send({
        data: rows,
        data2: rows2.length > 0 ? rows2[rows2.length - 1] : nullptr,
        valid: expired,
        ownerType: 0,
      });
    }
  }
};


module.exports = {
  detailModal,
};