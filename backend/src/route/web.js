import express from 'express'
import { verifyToken } from '../controller/verifyToken'
import homeController from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {
  // section - homepage
  router.get('/', homeController.homepage)
                                                                                    
                                                                                    
  // section - access
  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);
                                                                                    
                                                                                    
  // section - vehicles
  router.post('/vehicles/all', verifyToken, homeController.vehicles)
  router.post('/vehicles/registed', verifyToken, homeController.registed)
  router.post('/vehicles/expired', verifyToken, homeController.expired)
  router.post('/vehicles/find', verifyToken, homeController.findByLicense)
                                                                                    
                                                                                    
  // section - filter cho vehicles
  // logic - gửi code có thể là ssn hoặc taxnum 
  router.post('/filter/owner', verifyToken, homeController.owner)
                                                                                    
  // logic - gửi order là asc hay desc để sort result theo brand
  router.post('/filter/brand', verifyToken, homeController.brand)
                                                                                    
  // logic - trả về tất cả các brand của centre này
  router.post('/filter/brand/all', verifyToken, homeController.allBrand)
  // task - /filter/allBrand -> /filter/brand/all
                                                                                    
  // logic - trả về tất cả xe có brand khớp với brand gửi lên
  router.post('/filter/brand/exact', verifyToken, homeController.exactBrand)
  // task - /filter/exactBrand -> /filter/brand/exact
                                                                                    
  // logic - filter theo thời gian regist hoặc expire
  router.post('/filter/time', verifyToken, homeController.time)
                                                                                    
  // logic - trả về tất cả các city của centre này
  router.post('/filter/city/all', verifyToken, homeController.allCity)
  // task - /filter/allCity -> /filter/city/all
                                                                                    
  // logic - trả về tất cả xe có city khớp với city gửi lên
  router.post('/filter/city/exact', verifyToken, homeController.exactCity)
  // task - /filter/exactCity -> /filter/city/exact
                                                                                    
                                                                                    
  // section - info
  // logic - trả về lịch sử đăng kiểm của owner
  router.post('/owner/history', verifyToken, homeController.registHistory)
                                                                                    
  // logic - trả về thông tin xe thông qua licenseId
  router.post('/vehicles/modal', verifyToken, homeController.detailModal)
                                                                                    
  // logic - trả về thông tin chủ xe thông qua id nhận vào
  router.post('/owner/info', verifyToken, homeController.ownerInfo)
                                                                                    
  // logic - trả về thông tin của trung tâm người dùng đang đăng nhập
  router.get('/centre-info', verifyToken, homeController.centreInfo)
                                                                                    
  // logic - trả về data bao gồm số lượng đăng kiểm, hết hạn qua các năm các tháng
  router.get('/chart', verifyToken, homeController.getDataForChart)
                                                                                    
  // logic - thay đổi mật khẩu tài khoản đang đăng nhập
  router.post('/change-password',verifyToken ,homeController.changePassword)
                                                                                    
  // logic - activate 1 centre mới
  router.post('/insert-centre', verifyToken, homeController.insertCentre)
                                                                                    
  // logic - deactivate 1 centre
  router.post('/remove-centre', verifyToken, homeController.removeCentre)
  // logic - đọc dữ liệu từ file excel thêm vào db
  router.post('/read-excel', verifyToken, homeController.addDataFromExcel)
                                                                                    
                                                                                    
  // logic - tạo đăng kiểm mới
  router.post('/new-regist', verifyToken, homeController.newRegist)
                                                                                    
  // logic - trả về thông tin của đăng kiểm để preview
  router.post('/preview-regist', verifyToken, homeController.previewRegist)
                                                                                    
  // logic - check và update modification date của đăng kiểm
  router.post('/update-modify', verifyToken, homeController.updateModify)
                                                                                    
  // logic - trả về info xe đăng kiểm
  router.post('/preview-info', verifyToken, homeController.previewInfo)

  // logic - trả về thông tin xe vừa đăng kiểm
  router.post('/info/regist/latest', verifyToken, homeController.viewLatestRegist)
                                                                                    
                                                                                    
  // section - statistic
  // logic - trả về tất cả đăng kiểm của centre này
  router.post('/regist/all', verifyToken, homeController.allRegist)
                                                                                    
  // logic - gửi year, month, quarter, để lọc đăng kiểm, carType để lọc loại xe
  router.post('/regist/time', verifyToken, homeController.registByTime)
                                                                                    
  // logic - gửi biển số xe, lọc các đăng kiểm của xe này
  router.post('/regist/find', verifyToken, homeController.registByLicense)
                                                                                    
  // logic - gửi biển số xe, lọc các đăng kiểm của xe này
  router.post('/regist/detail', verifyToken, homeController.registModal)
                                                                                    
                                                                                    
  // section - forecast
  // logic - dự đoán các xe sắp hết hạn
  router.post('/forecast', verifyToken, homeController.forecast)

                                                                                    
  // section - department
  // logic - admin xem tất cả các centre
  router.get('/centre/all', verifyToken, homeController.viewAllCentres)
                                                                                    
  // logic - admin xem tất cả các xe toàn cục
  router.post('/vehicles/admin/all', verifyToken, homeController.viewAllVehicles)
                                                                                    
  // logic - admin xem tất cả các xe đã đăng kiểm toàn cục
  router.post('/vehicles/admin/registed', verifyToken, homeController.viewRegistedVehicles)
                                                                                    
  // logic - admin xem tất cả các xe đã hết hạn toàn cục
  router.post('/vehicles/admin/expired', verifyToken, homeController.viewExpiredVehicles)
                                                                                    
  // logic - admin xem tất cả các xe chưa đăng kiểm toàn cục
  router.post('/vehicles/admin/unregisted', verifyToken, homeController.viewUnregistedVehicles)

  return app.use('/', router)
}

export default initWebRoute