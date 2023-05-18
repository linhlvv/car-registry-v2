import pool from "../../../configs/connectDB";
// task - đang làm dở
let registHistory = async (req, res) => {
  let ownerid = req.body.ownerid;

  if (ownerid === undefined) {
    return res.status(422).send({ErrorCode: 'ER_MISSING_PARAM'})
  }
  
  let carType = "registed";

  let type = "";
  let queryType = "";

  let convert = () => {
    type = carType === "expired" ? " < " : " >= ";
    queryType =
      carType === "registed"
        ? "re.date as registryDate"
        : "timestampdiff(month, re.date, re.expire) as duration";
  };

  convert();
  let query =
    `
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, p.name, ce.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  join centre ce
    on ce.id = re.centreId
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` +
    req.session.userid +
    ` and ownerId = ` +
    ownerid +
    `  group by re.licenseId)  
  and expire` +
    type +
    `current_date()
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, c.name, ce.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  join centre ce
    on ce.id = re.centreId
  where (re.licenseId, expire) in
    (select v.licenseId as license, max(expire) as expire
      from vehicles v
    left join registry re
      on re.licenseId = v.licenseId
    where centreId = ` +
    req.session.userid +
    ` and ownerId = ` +
    ownerid +
    `  group by re.licenseId)  
  and expire` +
    type +
    `current_date()`;

  const [registRows, fields1] = await pool.query(query);

  carType = "expired";
  convert();
  query =
    `
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, p.name, ce.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  join centre ce
    on ce.id = re.centreId
    where centreId = ` +
    req.session.userid +
    ` and ownerId = ` +
    ownerid +
    ` and expire` +
    type +
    `current_date()
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, ` +
    queryType +
    `, re.expire, c.name, ce.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  join centre ce
    on ce.id = re.centreId
    where centreId = ` +
    req.session.userid +
    ` and ownerId = ` +
    ownerid +
    ` and expire` +
    type +
    `current_date()`;

  const [expireRows, fields2] = await pool.query(query);

  return res.send({ registed: registRows, expired: expireRows });
};

module.exports = {
  registHistory,
};

/* bug - 

select re.licenseId as license, v.brand, v.model, v.version, re.date as registryDate, re.expire, p.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join personal p
    on p.id = o.id
  where centreId = 453 and ownerId = 5528
  and expire >= current_date()
          union all 
  select re.licenseId as license, v.brand, v.model, v.version, re.date as registryDate, re.expire, c.name
    from registry re
  join vehicles v 
    on v.licenseId = re.licenseId
  join owner o 
    on v.ownerId = o.id
  join company c 
    on c.id = o.id
  where centreId = 453 and ownerId = 5528
  and expire >= current_date();

*/
