import pool from "../../configs/connectDB";
                                                  
//NOTE - đang làm dở
let ownerInfo = async (req, res) => {
  let ownerid = req.body.ownerId;

  let type = `select type from owner where id = ` + ownerid
  const [typeRows, fields] = await pool.query(type)

  if (typeRows[0].type === 1) {

  }
  else {

  }

  res.send('')
}

module.exports = {
  ownerInfo
}