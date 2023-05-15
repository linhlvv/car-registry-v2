import pool from "../configs/connectDB";

// task - hàm xác định user là admin với account type = 1

let verifyAdmin = async (req, res, next) => {
    let id = req.session.userid;
    
    if (id === undefined) {
        return res.status(422).send({ message: "You have to login!" });
    }
    
    let query = `select type from account where id = ?`;
    const [rows, fields] = await pool.query(query, [id]);
    
    if (rows[0].type !== 1) {
        return res.status(400).send({ message: "You are not admin!" });
    }
    
    next();
}

module.exports = {
    verifyAdmin
}
