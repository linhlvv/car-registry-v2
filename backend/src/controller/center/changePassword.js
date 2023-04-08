import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../../configs/connectDB';

//TODO - Viết hàm đổi mật khẩu 

let changePassword = async (req, res) => {
    let id = req.body.id;
    let oldPass = crypto.createHash('sha256').update(req.body.password).digest('hex');
    let newPass = crypto.createHash('sha256').update(req.body.newPass).digest('hex');
    let reNewPass = crypto.createHash('sha256').update(req.body.reNewPass).digest('hex');


    let query = 'select * from account where id = ? and password = ?';
    let check = await pool.query(query, [id, oldPass])
    if (check.length > 0) {
        if (newPass === reNewPass) {
            let query = 'update account set password = ? where id = ?'
            await pool.query(query, [newPass, id])
            return res.send({message: 'Password changed'})
        }
        else {
            return res.send({message: 'New password does not match'})
        }
    }
    else {
        return res.send({message: 'Wrong password'})
    }
}

module.exports = {
    changePassword
}
