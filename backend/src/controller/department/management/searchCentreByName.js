import pool from "../../../configs/connectDB";

// task - search tên centre
// input - tên centre
// output - thông tin của centre đó

let searchCentreByName = async (req, res) => {
    let name = req.body.name;
    
    if (name === undefined) {
        return res.status(422).send({ message: "Missing parameter!" });
    }
    
    let query = `select * from centre where name like ?`;
    const [rows, fields] = await pool.query(query, '%'+name+'%');
    return res.send(rows);
}

module.exports = {
    searchCentreByName
}