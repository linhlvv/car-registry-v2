import express from 'express'
import { verifyToken } from '../controller/verifyToken'
import { verifyAdmin } from '../controller/verifyAdmin'
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
  // logic - hiển thị dữ liệu xem trước của centre
  router.post('/preview-centre-info', verifyToken, homeController.previewCentreInfo)
  // logic - update thông tin của centre
  router.put('/update-centre-info', verifyToken, homeController.updateCentreInfo)
  // logic - tìm centre bằng tên
  router.post('/search-centre', verifyToken, homeController.searchCentreByName)
                                                                                    
                                                                                    
  // logic - tạo đăng kiểm mới
  router.post('/new-regist', verifyToken, homeController.newRegist)
                                                                                    
  // logic - trả về thông tin của đăng kiểm để preview
  router.post('/preview-regist', verifyToken, homeController.previewRegist)
                                                                                    
  // logic - check và update modification date của đăng kiểm
  router.put('/update-modify', verifyToken, homeController.updateModify)
                                                                                    
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
                                                                                    
  // logic - gửi id của đăng kiểm, trả về thông tin đăng kiểm
  router.post('/regist/detail', verifyToken, homeController.registModal)
                                                                                    
                                                                                    
  // section - forecast
  // logic - dự đoán các xe sắp hết hạn
  router.post('/forecast', verifyToken, homeController.forecast)

                                                                                    
  // section - department
  // logic - admin xem tất cả các centre
  router.get('/centre/all', verifyToken, verifyAdmin, homeController.viewAllCentres)
                                                                                    
  // logic - admin xem tất cả các xe toàn cục
  router.post('/vehicles/admin/all', verifyToken, verifyAdmin, homeController.viewAllVehicles)
                                                                                    
  // logic - admin xem tất cả các xe đã đăng kiểm toàn cục
  // input - resPerPage, page
  router.post('/vehicles/admin/registed', verifyToken, verifyAdmin, homeController.viewRegistedVehicles)
                                                                                    
  // logic - admin xem tất cả các xe đã hết hạn toàn cục
  // input - resPerPage, page
  router.post('/vehicles/admin/expired', verifyToken, verifyAdmin, homeController.viewExpiredVehicles)
                                                                                    
  // logic - admin xem tất cả các xe chưa đăng kiểm toàn cục
  // input - resPerPage, page
  router.post('/vehicles/admin/unregisted', verifyToken, verifyAdmin, homeController.viewUnregistedVehicles)
                                                                                    
  // logic - admin xem tất cả dự đoán
  // input - resPerPage, page, type(renew, new)
  router.post('/forecast/admin/all', verifyToken, verifyAdmin, homeController.forecastAll)
  // logic - admin xem tất cả dự đoán theo khu vực
  // input - resPerPage, page, type(renew, new), area
  router.post('/forecast/admin/area', verifyToken, verifyAdmin, homeController.forecastByArea)
  // logic - admin xem tất cả dự đoán theo trung tâm
  // input - resPerPage, page, type(renew, new), centre
  router.post('/forecast/admin/centre', verifyToken, verifyAdmin, homeController.forecastByCentre)

  
    // section - filter cho vehicles dùng cho admin
  // logic - gửi code có thể là ssn hoặc taxnum 
  // input - carType(registed, expired) , code
  router.post('/filter/admin/owner', verifyToken, verifyAdmin, homeController.adminFilterOwner)
                                                                                    
  // logic - gửi order là asc hay desc để sort result theo brand
  // input - resPerPage, page, carType(registed, expired), order
  router.post('/filter/admin/brand', verifyToken, verifyAdmin, homeController.adminFilterBrand)
                                                                                    
  // logic - trả về tất cả các brand của centre này
  // input - carType(registed, expired)
  router.post('/filter/admin/brand/all', verifyToken, verifyAdmin, homeController.adminViewAllBrand)
                                                                                    
  // logic - trả về tất cả xe có brand khớp với brand gửi lên
  // input - resPerPage, page, carType(registed, expired), brand
  router.post('/filter/admin/brand/exact', verifyToken, verifyAdmin, homeController.adminViewExactBrand)
                                                                                    
  // logic - filter theo thời gian regist hoặc expire
  // input - resPerPage, page, carType(registed, expired), year, month, quarter
  router.post('/filter/admin/time', verifyToken, verifyAdmin, homeController.adminFilterTime)
                                                                                    
  // logic - trả về tất cả các city của centre này
  // input - carType(registed, expired)
  router.post('/filter/admin/city/all', verifyAdmin, verifyToken, homeController.adminViewAllCity)
                                                                                    
  // logic - trả về tất cả xe có city khớp với city gửi lên
  // input - resPerPage, page, carType(registed, expired), city
  router.post('/filter/admin/city/exact', verifyAdmin, verifyToken, homeController.adminViewExactCity)

  // logic - tất cả các thành phố kèm mã vùng
  router.get('/stats/area', verifyToken, homeController.allArea)

  // logic - tất cả các trung tâm
  router.get('/stats/centre', verifyToken, homeController.allCentre)

    // section - info
  // logic - trả về dữ liệu toàn hệ thống cho biểu đồ
  router.post('/admin/chart', verifyToken, verifyAdmin, homeController.adminGetDataForChart)
  // logic - trả về thứ hạng và tổng số đăng kiểm của trung tâm
  router.post('/admin/centre/rank', verifyToken, homeController.getRankByRegist)
  // logic - trả về năm có nhiều đăng kiểm nhất của trung tâm và số đăng kiểm trong năm đó
  router.post('/admin/centre/productive-year', verifyToken, homeController.getProductiveYear)
  // logic - trả về tháng có nhiều đăng kiểm nhất của trung tâm và số đăng kiểm trong tháng đó
  router.post('/admin/centre/bursty-month', verifyToken, homeController.getBurstyMonth)

    // section - statistic
  // logic - trả về tất cả đăng kiểm toàn hệ thống
  router.post('/stats/all', verifyToken, verifyAdmin, homeController.adminAllRegist)
  // logic - trả về tất cả đăng kiểm của xe có biển số khớp với biển số gửi lên
  router.post('/stats/find', verifyToken, verifyAdmin, homeController.adminRegistByLicense)
  // logic - trả về tất cả đăng kiểm của xe có thời gian khớp với thời gian gửi lên
  router.post('/stats/time', verifyToken, verifyAdmin, homeController.adminRegistByTime)
  // logic - trả về tất cả đăng kiểm của trung tâm có tên khớp với tên gửi lên
  router.post('/stats/centre', verifyToken, verifyAdmin, homeController.adminRegistByCentre)
  // logic - trả về tất cả đăng kiểm của xe có khu vực khớp với khu vực gửi lên
  router.post('/stats/area', verifyToken, verifyAdmin, homeController.adminRegistByArea)

  return app.use('/', router)
}

export default initWebRoute