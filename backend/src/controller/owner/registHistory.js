import pool from "../../configs/connectDB";
// task - đang làm dở
let registHistory = async (req, res) => {
  let ownerid = req.body.ownerid
  let carType = req.body.carType

  let type = carType === 'registed' ? ' >= ' : ' < '
  let queryType = carType === 'registed' 
                              ? 're.date as registryDate'
                              : 'timestampdiff(month, re.date, re.expire) as duration'
  res.send('')
}

module.exports = {
  registHistory
}