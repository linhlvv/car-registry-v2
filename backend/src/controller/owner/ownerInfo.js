import pool from "../../configs/connectDB";
                                                  
//NOTE - đang làm dở
let ownerInfo = async (req, res) => {
  let ownerid = req.body.ownerId;

  let type = `select type from owner where id = ` + ownerid
  const [rows, fields] = await pool.query(type)

  if (rows[0].type === 1) {
    let owner = `
    select name, phone, address, ssn
    from owner o 
    join personal p 
    on o.id = p.id
    where o.id = ` + ownerid
    const [rows, fields] = await pool.query(owner)
    return res.send({data: rows, type: 1})

  }
  else {
    let owner = `
    select name, phone, address, taxnum
    from owner o 
    join company c 
    on o.id = c.id
    where o.id = ` + ownerid
    const [rows, fields] = await pool.query(owner)
    return res.send({data: rows, type: 0})
  }
}

module.exports = {
  ownerInfo
}