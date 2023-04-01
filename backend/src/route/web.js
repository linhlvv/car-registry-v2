import express from 'express'
import homeController from '../controller/homeController'
import {verifyToken} from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {

  router.get('/', homeController.homepage)

  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);

  router.post('/vehicles/all', verifyToken, homeController.vehicles)
  router.post('/vehicles/registed', verifyToken, homeController.registried)
  router.post('/vehicles/unregisted', verifyToken, homeController.unregistried)
  router.post('/vehicles/expired', verifyToken, homeController.expire)

  router.get('/centre-info/', homeController.centreInfo)

  router.get('/centre-info', homeController.centreInfo)

  return app.use('/', router)
}

export default initWebRoute