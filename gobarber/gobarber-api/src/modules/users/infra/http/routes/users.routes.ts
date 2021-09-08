import {Router} from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersControllers'
import UserAvatarController from '../controllers/UserAvatarController'

import ensuredAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const upload = multer(uploadConfig)

const userController = new UsersController()
const userAvatarController = new UserAvatarController()

const usersRouter = Router()

usersRouter.post('/', userController.create )
usersRouter.patch('/avatar',ensuredAuthenticated,upload.single('avatar'),userAvatarController.update)

export default usersRouter
