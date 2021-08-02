import { CreateAppointmentController, GetAppointmentController } from '../controllers/AppointmentController'
import {Router} from 'express'

import ensuredAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensuredAuthenticated)

const createAppointmentController = new CreateAppointmentController()
const getAppointmentController = new GetAppointmentController()

appointmentsRouter.get('/',getAppointmentController.list)
appointmentsRouter.post('/', createAppointmentController.post )


export default appointmentsRouter
