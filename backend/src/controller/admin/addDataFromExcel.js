const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
import pool from '../../configs/connectDB';

// task - lấy data từ file excel thêm vào vehicles và owners
// input - file excel từ phía client
// output - thêm dữ liệu vào db, trả về thông báo thành công hay thất bại



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
            console.log(data)
            return res.status(200).send({message: 'Success!'})
        }
    })
}

module.exports = {
    addDataFromExcel
}


