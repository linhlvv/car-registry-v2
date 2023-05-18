import pool from "../../../configs/connectDB";

let forecast = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage);
  let page = parseInt(req.body.page);
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let match =
    `\nand year(expire) = ` +
    year +
    `\nand month(expire) = ` +
    month +
    `\nand expire >= CURRENT_DATE()`;

  let count =
    `
  select count(*) as total
    from registry re
  where centreId = ` +
    req.session.userid + match

  let query =
    `
  select r.licenseId, brand, model, version, max(expire) expire, p.name as name
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join personal p 
    on v.ownerId = p.id
  where centreId = ` +
    req.session.userid + match +
    `
  group by licenseId
        union all
  select r.licenseId, brand, model, version, max(expire) expire, c.name as name
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join company c 
    on v.ownerId = c.id
  where centreId = ` +
    req.session.userid + match +
    ` 
  group by licenseId
  order by expire asc
    limit ? offset ?`;

  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [countRows, countFields] = await pool.query(count, [
      req.session.userid,
    ]);
    const [rows, fields] = await pool.query(query, [
      resPerPage,
      resPerPage * (page - 1),
    ]);
    return res.send({
      data: rows,
      countData: countRows[0].total,
      countPage: Math.ceil(countRows[0].total / resPerPage),
    });
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  forecast,
}
