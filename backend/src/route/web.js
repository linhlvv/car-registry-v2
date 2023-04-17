import express from 'express'
import { verifyToken } from '../controller/authenticate/verifyToken'
import homeController from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {

  router.get('/', homeController.homepage)
                                                                                    
                                                                                    
  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);
                                                                                    
                                                                                    
  router.post('/vehicles/all', verifyToken, homeController.vehicles)
  router.post('/vehicles/registed', verifyToken, homeController.registed)
  router.post('/vehicles/expired', verifyToken, homeController.expired)
  router.post('/vehicles/find', verifyToken, homeController.findByLicense)
                                                                                    
                                                                                    
  // logic - gửi code có thể là ssn hoặc taxnum 
  router.post('/filter/owner', verifyToken, homeController.owner)
                                                                                    
  // logic - gửi order là asc hay desc để sort result theo brand
  router.post('/filter/brand', verifyToken, homeController.brand)
                                                                                    
  // logic - trả về tất cả các brand của centre này
  router.post('/filter/allBrand', verifyToken, homeController.allBrand)
                                                                                    
  // logic - trả về tất cả xe có brand khớp với brand gửi lên
  router.post('/filter/exactBrand', verifyToken, homeController.exactBrand)
                                                                                    
  // logic - filter theo thời gian regist hoặc expire
  router.post('/filter/time', verifyToken, homeController.time)
                                                                                    
  // logic - trả về tất cả các city của centre này
  router.post('/filter/allCity', verifyToken, homeController.allCity)
                                                                                    
  // logic - trả về tất cả xe có city khớp với city gửi lên
  router.post('/filter/exactCity', verifyToken, homeController.exactCity)
                                                                                    
                                                                                    
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
                                                                                    
  // logic - admin xem tất cả các centre
  router.get('/view-all-centres', verifyToken, homeController.viewAllCentres)
                                                                                    
  // logic - admin xem tất cả các xe toàn cục
  router.get('/view-all-cars', verifyToken, homeController.viewAllCars)
                                                                                    
  // logic - activate 1 centre mới
  router.post('/insert-centre', verifyToken, homeController.insertCentre)
                                                                                    
  // logic - deactivate 1 centre
  router.post('/remove-centre', verifyToken, homeController.removeCentre)
                                                                                    
                                                                                    
  // logic - tạo đăng kiểm mới
  router.post('/new-regist', verifyToken, homeController.newRegist)
                                                                                    
  // logic - trả về thông tin của đăng kiểm để preview
  router.post('/preview-regist', verifyToken, homeController.previewRegist)
                                                                                    
  // logic - check và update modification date của đăng kiểm
  router.post('/update-modify', verifyToken, homeController.updateModify)
                                                                                    
  // logic - trả về info xe đăng kiểm
  router.post('/preview-info', verifyToken, homeController.previewInfo)
                                                                                    
                                                                                    
  // logic - trả về tất cả đăng kiểm của centre này
  router.post('/allRegist', verifyToken, homeController.allRegist)

  return app.use('/', router)
}

export default initWebRoute