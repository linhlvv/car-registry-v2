import pool from '../../configs/connectDB';
// logic - Lấy data từ body, kiểm tra tồn tại acc hay chưa, sau đó check pass mới và repass nếu pass mới và repass khớp thì insert vào db, nếu không thì trả về lỗi

// task - tạo acc mới và centre mới



let insertCentre = async (req, res) => {

    console.log(req.body)
    let name = req.body.centreName;
    let city = req.body.city;
    let district = req.body.district;
    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.repassword;
    
    let type = req.body.type;
    
    //Kiểm tra tồn tại chưa
    let check = 'select * from account where email = ?'
    const [rows, fields] = await pool.query(check, [email])
    if (rows.length > 0) {
        return res.send({message: 'Email already exists'})
    }

    //Kiểm tra mật khẩu và mật khẩu được nhập lại
    if (password !== repassword) {
        return res.send({message: 'Password does not match'})
    }
    else {
        let insertAcc = 'insert into account (email, password, type) values (?, ?, ?)'
        let insertCen = 'insert into centre (name, city, district, activation) values (?, ?, ?, CURRENT_DATE())'
        
        await pool.query(insertCen, [name, city, district])
        await pool.query(insertAcc, [email, password, type])
        return res.send({message: 'Account created'})
    }

}

module.exports = {
    insertCentre
}