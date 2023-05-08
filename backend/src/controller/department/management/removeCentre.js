import pool from "../../../configs/connectDB";


// task - xoá centre


let removeCentre = async (req, res) => {
    let id = req.body.id
    let query = 'delete from centre where id = ?; delete from account where id = ?'
    await pool.query(query, [id])
    return res.send({message: 'Centre removed'})
}

module.exports = {
    removeCentre
}
