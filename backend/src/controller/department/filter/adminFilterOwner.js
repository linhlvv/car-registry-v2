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
    select v.licenseId as license, v.brand, v.model, v.version, p.name 
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
  and ssn = ?
  UNION ALL
  select v.licenseId as license, v.brand, v.model, v.version, c.name 
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
  and taxnum = ?
    `
    :
    `
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, p.name
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
  and ssn = ?
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, c.name
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
  and taxnum = ?
    order by license`;
  try {
    const [rows, fields] = await pool.query(query, 
    [
      name,
      code,
      name,
      code]);
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
