import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../../configs/connectDB';

//TODO - Viết hàm đổi mật khẩu 

let changePassword = async (req, res) => {
    let id = req.body.id;
    let oldPass = crypto.createHash('sha256').update(req.body.password).digest('hex');
    let newPass = crypto.createHash('sha256').update(req.body.newPass).digest('hex');
    let reNewPass = crypto.createHash('sha256').update(req.body.reNewPass).digest('hex');

    console.log(oldPass)

    let query = 'select * from account where id = ? and password = ?';
    let check = await pool.query(query, [id, oldPass])
    if (check[0].length > 0) {
        if (newPass === oldPass) {
            return res.status(400).send({message: 'New password is the same as old password'})
        }
        if (newPass === reNewPass) {
            let query = 'update account set password = ? where id = ? and password = ?'
            await pool.query(query, [newPass, id, oldPass])
            return res.status(200).send({message: 'Password changed'})
        }
        
        else {
            return res.status(400).send({message: 'New password does not match'})
        }
    }
    else {
        return res.status(400).send({message: 'Wrong password'})
    }
}

module.exports = {
    changePassword
}
