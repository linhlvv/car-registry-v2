import pool from "../../../configs/connectDB";
// input - resPerPage, page, type (renew, new), area
let forecastByArea = async (req, res) => {
  let resPerPage = parseInt(req.body.resPerPage);
  let page = parseInt(req.body.page);
  if (req.body.resPerPage === undefined)
    resPerPage = 10
  if (req.body.page === undefined)
    page = 1

  if (req.body.area === undefined)
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})

  let count = ``
  let query = ``

  if (req.body.type === 'renew') {
    let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let match =
    `\nand year(expire) = ` + year +
    `\nand month(expire) = ` + month +
    `` +
    // `\nand expire >= CURRENT_DATE()` +
    `\nand re.name = '` + req.body.area + `'`

  count = `
  select count(*) as total
    from registry r
  join vehicles v
    on r.licenseId = v.licenseId
  join region re
    on v.regionId = re.id` + match

  query = `
  select r.licenseId, brand, model, version, max(expire) as expire, p.name as name
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join personal p 
    on v.ownerId = p.id
  join region re
    on v.regionId = re.id
  join centre ce
    on ce.id = r.centreId` +
    match +
    `
  group by licenseId
        union all
  select r.licenseId, brand, model, version, max(expire) as expire, c.name as name
  from registry r
  join vehicles v 
    on r.licenseId = v.licenseId
  join company c 
    on v.ownerId = c.id
  join region re
    on v.regionId = re.id
  join centre ce
    on ce.id = r.centreId` +
    match +
    ` 
  group by licenseId
  order by licenseId asc, expire desc
    limit ? offset ?`
  } else {
    count = `
    select count(*) as total
      from vehicles v
    join region re
      on v.regionId = re.id
    where licenseId not in
      (select licenseId from registry)
    and re.name = '` + req.body.area + `'`

    query = `
    select licenseId, brand, model, version, p.name as name
      from vehicles v
    join personal p
      on v.ownerId = p.id
    join region re
      on v.regionId = re.id
    where licenseId not in
      (select licenseId from registry)
    and re.name = '` + req.body.area + `'
        union all
    select licenseId, brand, model, version, c.name as name
      from vehicles v
    join company c
      on v.ownerId = c.id
    join region re
      on v.regionId = re.id
    where licenseId not in
      (select licenseId from registry)
    and re.name = '` + req.body.area + `'
    order by licenseId asc
      limit ? offset ?`
  }


  // bug - đã gọi được api kết quả trả về chính xác
  try {
    const [countRows, countFields] = await pool.query(count, [
      req.session.userid,
    ])
    const [rows, fields] = await pool.query(query, [
      resPerPage,
      resPerPage * (page - 1),
    ])
    return res.send({
      data: rows,
      countData: countRows[0].total,
      countPage: Math.ceil(countRows[0].total / resPerPage),
    })
  }
  catch (err) {
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno})
  }
}

module.exports = {
  forecastByArea
};
