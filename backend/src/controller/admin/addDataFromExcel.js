import multer from 'multer';
import XLSX from 'xlsx';
import path from 'path';
import pool from '../../configs/connectDB';

// task - lấy data từ file excel thêm vào vehicles và owners
// input - file excel từ phía client
// output - thêm dữ liệu vào db, trả về thông báo thành công hay thất bại

// bug - không nhận được ownerType
//Hàm chuyển date từ excel sang js
function excelDateToJSDate(excelDate) {
  let date = new Date((excelDate - 25569) * 86400000);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  let formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}


// Khai báo đường dẫn lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage }).single('file');

let addDataFromExcel = async (req, res) => {
    let ownerType = parseInt(req.body.ownerType)
    upload(req, res, async (err) => {
        if (err) {
          console.log(err)
            return res.status(400).send({message: 'Upload file failed'})
        }
        //nếu không phải file excel
        else if (path.extname(req.file.originalname).toLowerCase() !== '.xlsx') {
            return res.status(400).send({message: 'File is not excel'})
        }
        else {
            // Đọc file excel
          
            const workbook = XLSX.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            ownerType = req.body.ownerType
            console.log(ownerType)
            // Thêm dữ liệu vào db
            for (let i = 0; i < data.length; i++) {
              //Thêm vào personal
              if (ownerType == 1) {
                console.log("Add to personal")
                //Chuyển ngày sinh về đúng định dạng
                data[i]['Ngày sinh'] = excelDateToJSDate(data[i]['Ngày sinh']) 
                let addOwner = 'insert into owner (type) VALUES (1);'
                
                let addPersonal = 
                `insert into personal (id, dob, ssn, name, address, phone, gender) \
                values ((SELECT MAX(ID) FROM owner), ?, ?, ?, ?, ?, ?);`
                let params = [data[i]['Ngày sinh'], data[i]['SSN'], data[i]['Họ và tên'], data[i]['Địa chỉ'], data[i]['Số điện thoại'], data[i]['Giới tính']]
                try {
                  await pool.query(addOwner)
                  await pool.query(addPersonal, params)
                } catch (err) {
                  if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send(console.log('Duplicate key error: ', err))
                  } else {
                    return res.status(400).send(console.log('MySQL error: ', err))
                  }
                }
              }
              //Thêm vào company
              else if (ownerType == 0) {
                addOwner = `insert into owner (type) VALUES (0);`
                let addCompany = 
                `insert into company (id, name, address, phone, taxnum, ownership) 
                values ((SELECT MAX(ID) FROM owner), ?, ?, ?, ?, ?);`
                let params = [data[i]['Tên công ty'], data[i]['Địa chỉ'], data[i]['Số điện thoại'], data[i]['Mã thuế'], data[i]['Hình thức sở hữu']]
                try {
                  await pool.query(addOwner)
                  await pool.query(addCompany, params)
                } catch (err) {
                  if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send(console.log('Duplicate key error: ', err))
                  } else {
                    return res.status(400).send(console.log('MySQL error: ', err))
                  }
                }
              }
              //Thêm vào vehicles
              if (data[i]['Sửa chữa'] == 'Chưa') {
                data[i]['Sửa chữa'] = 0
                data[i]['Ngày sửa chữa'] = null
              } 
              else if (data[i]['Sửa chữa'] == 'Đã sửa chữa') {
                data[i]['Sửa chữa'] = 1
              }
              //Chuyển các định dạng ngày về js
              data[i]['Ngày đăng ký'] = excelDateToJSDate(data[i]['Ngày đăng ký'])
              data[i]['Ngày sản xuất'] = excelDateToJSDate(data[i]['Ngày sản xuất'])
              if (data[i]['Ngày sửa chữa'] !== null) {
                data[i]['Ngày sửa chữa'] = excelDateToJSDate(data[i]['Ngày sửa chữa'])
              }

              let addVehicle =
              `insert into vehicles (licenseId, certId, certDate, regionId, ownerId, brand, model, version, manafractureDate, modified, modifyDate)
              values (?, ?, ?, ?, (SELECT MAX(ID) FROM owner), ?, ?, ?, ?, ?, ?);`
              let params = [data[i]['Biển số'], data[i]['Mã đăng ký'], data[i]['Ngày đăng ký'], data[i]['Mã vùng'], data[i]['Hãng xe'], data[i]['Model'], data[i]['Phiên bản'], data[i]['Ngày sản xuất'], data[i]['Sửa chữa'], data[i]['Ngày sửa chữa']]
              try {
                await pool.query(addVehicle, params)
              } catch (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(400).send(console.log('Duplicate key error: ', err))
                } else {
                  return res.status(400).send(console.log('MySQL error: ', err))
                }
              }
            }
            return res.status(200).send({message: 'Add data successfully!'})
        }
    })
}

module.exports = {
    addDataFromExcel
}


