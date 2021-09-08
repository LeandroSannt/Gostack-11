import  AppointmentsController from '../controllers/AppointmentsController'
import {Router} from 'express'

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
appointmentsRouter.use(ensuredAuthenticated)

const appointmentsController = new AppointmentsController()

appointmentsRouter.post('/', appointmentsController.create )

export default appointmentsRouter
