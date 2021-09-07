import {Router} from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { UpdateAvatarController, CreateUserController } from '../../../../../controllers/CreateUserController'

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const upload = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateAvatarController = new UpdateAvatarController()

const usersRouter = Router()

usersRouter.post('/', createUserController.post )

usersRouter.patch('/avatar',ensuredAuthenticated,upload.single('avatar'),updateAvatarController.post)

export default usersRouter
