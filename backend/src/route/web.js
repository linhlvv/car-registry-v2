import express from 'express'
import homeController from '../controller/homeController'

let router = express.Router()

const initWebRoute = (app) => {
  router.get('/', homeController.homePage)

  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);

  router.post('/vehicles', homeController.vehicles)
  router.get('/centre-info', homeController.centreInfo)

  return app.use('/', router)
}

export default initWebRoute