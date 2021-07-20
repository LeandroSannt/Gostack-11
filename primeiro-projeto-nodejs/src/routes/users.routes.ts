import {Router} from 'express'
import { CreateUserController } from '../controllers/CreateUserController'

const createUserController = new CreateUserController()

const usersRouter = Router()

usersRouter.post('/', createUserController.post )

export default usersRouter
