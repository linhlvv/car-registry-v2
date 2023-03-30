import express from 'express'
import homeController from '../controller/homeController'
import {verifyToken} from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {

  router.get('/', homeController.homepage)

  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);

  router.post('/vehicles/all', verifyToken, homeController.vehicles)
  router.post('/vehicles/registried', verifyToken, homeController.registried)
  router.post('/vehicles/unregistried', verifyToken, homeController.unregistried)
  router.post('/vehicles/expire', verifyToken, homeController.expire)

  router.get('/centre-info/', homeController.centreInfo)

  return app.use('/', router)
}

export default initWebRoute