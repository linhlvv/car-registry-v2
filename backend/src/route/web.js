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

  router.post('/filter/owner', verifyToken, homeController.owner)
  router.post('/filter/brand', verifyToken, homeController.brand)
  router.post('/filter/allBrand', verifyToken, homeController.allBrand)
  router.post('/filter/exactBrand', verifyToken, homeController.exactBrand)

  router.post('/vehicles/modal', verifyToken, homeController.detailModal)

  router.post('/owner/info', verifyToken, homeController.ownerInfo)

  router.get('/centre-info', verifyToken, homeController.centreInfo)

  router.get('/chart', verifyToken, homeController.getDataForChart)

  router.post('/change-password',verifyToken ,homeController.changePassword)

  router.get('/view-all-centres', verifyToken, homeController.viewAllCentres)
  router.get('/view-all-cars', verifyToken, homeController.viewAllCars)
  router.post('/insert-centre', verifyToken, homeController.insertCentre)
  router.post('/remove-centre', verifyToken, homeController.removeCentre)

  return app.use('/', router)
}

export default initWebRoute