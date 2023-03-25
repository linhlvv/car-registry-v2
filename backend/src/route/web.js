import express from 'express'
import homeController from '../controller/homeController'

let router = express.Router()

const initWebRoute = (app) => {
  router.get('/', homeController.getHomePage)

  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);

  return app.use('/', router)
}

export default initWebRoute