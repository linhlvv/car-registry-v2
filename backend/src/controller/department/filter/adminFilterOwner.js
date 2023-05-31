import pool from "../../../configs/connectDB";

let adminFilterOwner = async (req, res) => {

  let filter = req.body.filter;
  let name = req.body.name;

  let carType = req.body.carType;
  let code = req.body.code;

  if (carType === undefined || code === undefined) {
    return res.status(422).send({ ErrorCode: "ER_MISSING_PARAM" });
  }

  let sub = "";
  if (filter === "region") {
    sub = 
    `
    LEFT JOIN region r ON
    r.id = v.regionId 
    WHERE r.name = ?
    `
  }
  else if (filter === "centre") {
    sub = 
    `
    LEFT JOIN centre c ON
    c.id = re.centreId 
    WHERE c.name = ?
    `
  }

  // logic - dùng code thay cho ssn vì có cả taxnum nữa
  let type = carType === "registed" ? " >= " : " < ";

  let queryType =
    carType === "registed"
      ? "re.date as registryDate"
      : "timestampdiff(month, re.date, re.expire) as duration";

  let query = carType === "unregisted" ? 
    `
    select v.licenseId as license, v.brand, v.model, v.version, p.name, p.ssn
  FROM vehicles v
  join owner o 
      on v.ownerId = o.id
  join personal p
      on p.id = o.id
    `
  + sub + (sub === "" ? `where` : `and`) +
    `
    v.licenseId NOT IN 
  (SELECT registry.licenseId  FROM registry)
  and p.ssn = ?
  UNION ALL
  select v.licenseId as license, v.brand, v.model, v.version, c.name, c.taxnum
  FROM vehicles v
  join owner o 
      on v.ownerId = o.id
  join company c
      on c.id = o.id
    ` 
      + sub + (sub === "" ? `where` : `and`) +
    `
    v.licenseId NOT IN 
  (SELECT registry.licenseId  FROM registry)
  and c.taxnum = ?
    `
    :
    `
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, p.name, p.ssn
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
      `
      +
      sub
      + 
      `
    group by re.licenseId)  
  and expire` +
    type +
    `current_date()
  and p.ssn = ?
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, c.name, c.taxnum
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
      `
      +
      sub
      +
      `
     group by re.licenseId)  
  and expire` +
    type +
    `current_date()
  and c.taxnum = ?
    order by license`;
    console.log(query)
    console.log(code)
  let rows = []
  let fields = []
  try {
    if (sub === "") {
      [rows, fields] = await pool.query(query, 
    [
      code,
      code]);
    }
    else {
      [rows, fields] = await pool.query(query, 
    [
      name,
      code,
      name,
      code]);
    }
    console.log(rows)
  return res.send({ data: rows });
}
  catch (err) {
    console.log(err);
    return res.status(500).send({ErrorCode: err.code, ErrorNo: err.errno});
  }
};

module.exports = {
  adminFilterOwner,
};
