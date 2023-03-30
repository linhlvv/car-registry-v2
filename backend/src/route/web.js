import express from 'express'
import homeController from '../controller/homeController'

let router = express.Router()

const initWebRoute = (app) => {

  router.get('/', homeController.homepage)

  router.post('/auth', homeController.authenticate);
  router.get('/logout', homeController.logout);

  router.post('/vehicles/all', homeController.vehicles)
  router.post('/vehicles/registried', homeController.registried)
  router.post('/vehicles/unregistried', homeController.unregistried)
  router.post('/vehicles/expire', homeController.expire)

  router.get('/centre-info/:id', homeController.centreInfo)

  return app.use('/', router)
}

export default initWebRoute