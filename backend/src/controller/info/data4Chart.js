//Viêt hàm trả về arr các năm hoạt động, mỗi năm gồm các arr các tháng gồm số xe đkiem, số xe hết hạn

import pool from '../../configs/connectDB'

let getDataForChart = async (req, res) => {
    if (req.session.email === undefined) {
        return res.redirect('/')
    }
    let centreId = `select c.id from account a
    join centre c
    on c.id = a.id
    where
    a.email = ?`
    const [rows, fields] = await pool.query(centreId, [req.session.email])
    let regist_base = 'select count(*) as Registed from registry where centreId = ? and date like ?'
    let expire_base = 'select count(*) as Expired from registry where centreId = ? and expire like ?'
    
    
    

    let cnt_regist = []
    let cnt_expire = []

    let cnt_regist_January = []
    let cnt_regist_February = []
    let cnt_regist_March = []
    let cnt_regist_April = []
    let cnt_regist_May = []
    let cnt_regist_June = []
    let cnt_regist_July = []
    let cnt_regist_August = []
    let cnt_regist_September = []
    let cnt_regist_October = []
    let cnt_regist_November = []
    let cnt_regist_December = []

    let cnt_expire_January = []
    let cnt_expire_February = []
    let cnt_expire_March = []
    let cnt_expire_April = []
    let cnt_expire_May = []
    let cnt_expire_June = []
    let cnt_expire_July = []
    let cnt_expire_August = []
    let cnt_expire_September = []
    let cnt_expire_October = []
    let cnt_expire_November = []
    let cnt_expire_December = []


    let data_regist = []
    let data_expire = []

    for (let i = 2021; i <= 2023; i++) {
        cnt_regist[i] = await pool.query(regist_base,[rows[0].id, i + '-__-__']);
        cnt_expire[i] = await pool.query(expire_base,[rows[0].id, i + '-__-__']);
        
        cnt_regist_January[i] = await pool.query(regist_base,[rows[0].id, i + '-01-__']);
        cnt_regist_February[i] = await pool.query(regist_base,[rows[0].id, i + '-02-__']);
        cnt_regist_March[i] = await pool.query(regist_base,[rows[0].id, i + '-03-__']);
        cnt_regist_April[i] = await pool.query(regist_base,[rows[0].id, i + '-04-__']);
        cnt_regist_May[i] = await pool.query(regist_base,[rows[0].id, i + '-05-__']);
        cnt_regist_June[i] = await pool.query(regist_base,[rows[0].id, i + '-06-__']);
        cnt_regist_July[i] = await pool.query(regist_base,[rows[0].id, i + '-07-__']);
        cnt_regist_August[i] = await pool.query(regist_base,[rows[0].id, i + '-08-__']);
        cnt_regist_September[i] = await pool.query(regist_base,[rows[0].id, i + '-09-__']);
        cnt_regist_October[i] = await pool.query(regist_base,[rows[0].id, i + '-10-__']);
        cnt_regist_November[i] = await pool.query(regist_base,[rows[0].id, i + '-11-__']);
        cnt_regist_December[i] = await pool.query(regist_base,[rows[0].id, i + '-12-__']);

        cnt_expire_January[i] = await pool.query(expire_base,[rows[0].id, i + '-01-__']);
        cnt_expire_February[i] = await pool.query(expire_base,[rows[0].id, i + '-02-__']);
        cnt_expire_March[i] = await pool.query(expire_base,[rows[0].id, i + '-03-__']);
        cnt_expire_April[i] = await pool.query(expire_base ,[rows[0].id, i + '-04-__']);
        cnt_expire_May[i] = await pool.query(expire_base,[rows[0].id, i + '-05-__']);
        cnt_expire_June[i] = await pool.query(expire_base,[rows[0].id, i + '-06-__']);
        cnt_expire_July[i] = await pool.query(expire_base,[rows[0].id, i + '-07-__']);
        cnt_expire_August[i] = await pool.query(expire_base,[rows[0].id, i + '-08-__']);
        cnt_expire_September[i] = await pool.query(expire_base,[rows[0].id, i + '-09-__']);
        cnt_expire_October[i] = await pool.query(expire_base,[rows[0].id, i + '-10-__']);
        cnt_expire_November[i] = await pool.query(expire_base,[rows[0].id, i + '-11-__']);
        cnt_expire_December[i] = await pool.query(expire_base,[rows[0].id, i + '-12-__']);

        data_regist[i] = {
            total: cnt_regist[i][0][0].Registed, 
            month: {
                January: cnt_regist_January[i][0][0].Registed,
                February: cnt_regist_February[i][0][0].Registed,
                March: cnt_regist_March[i][0][0].Registed,
                April: cnt_regist_April[i][0][0].Registed,
                May: cnt_regist_May[i][0][0].Registed,
                June: cnt_regist_June[i][0][0].Registed,
                July: cnt_regist_July[i][0][0].Registed,
                August: cnt_regist_August[i][0][0].Registed,
                September: cnt_regist_September[i][0][0].Registed,
                October: cnt_regist_October[i][0][0].Registed,
                November: cnt_regist_November[i][0][0].Registed,
                December: cnt_regist_December[i][0][0].Registed
            }
        }

        data_expire[i] = {
            total: cnt_expire[i][0][0].Expired,
            month: {
                January: cnt_expire_January[i][0][0].Expired,
                February: cnt_expire_February[i][0][0].Expired,
                March: cnt_expire_March[i][0][0].Expired,
                April: cnt_expire_April[i][0][0].Expired,
                May: cnt_expire_May[i][0][0].Expired,
                June: cnt_expire_June[i][0][0].Expired,
                July: cnt_expire_July[i][0][0].Expired,
                August: cnt_expire_August[i][0][0].Expired,
                September: cnt_expire_September[i][0][0].Expired,
                October: cnt_expire_October[i][0][0].Expired,
                November: cnt_expire_November[i][0][0].Expired,
                December: cnt_expire_December[i][0][0].Expired
            }
        }
        
    }
    return res.send({
        Year_2021: {
            regist: data_regist[2021],
            expire: data_expire[2021]
        },
        Year_2022: {
            regist: data_regist[2022],
            expire: data_expire[2022]
        },
        Year_2023: {
            regist: data_regist[2023],
            expire: data_expire[2023]
        }

    })
}
module.exports = {
    getDataForChart
}