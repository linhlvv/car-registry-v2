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

  router.get('/centre-info/', homeController.centreInfo)

  router.get('/centre-info', homeController.centreInfo)

  router.get('/center', homeController.getDataForChart)
  return app.use('/', router)
}

export default initWebRoute