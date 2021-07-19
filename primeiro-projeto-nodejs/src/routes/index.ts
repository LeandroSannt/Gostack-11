import {Router} from 'express'
import { CreateAppointmentController, GetAppointmentController } from '../controllers/AppointmentController'

const routes = Router()


const createAppointmentController = new CreateAppointmentController()
const getAppointmentController = new GetAppointmentController()

routes.get('/appointments',getAppointmentController.list)
routes.post('/appointments', createAppointmentController.post )

export default routes;
