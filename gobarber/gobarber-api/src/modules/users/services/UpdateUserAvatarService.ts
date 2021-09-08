import {injectable,inject} from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import path from 'path'

import  IUsersRepository  from "../repositories/IUsersRepository";


import AppError from '@shared/errors/AppErros'


import fs from 'fs'

interface Request{
  user_id:string
  avatarFilename:string
}
@injectable()
class UpdateUserAvatarService{

  constructor(@inject('UserRepository') private usersRepository:IUsersRepository,){}

  public async execute({user_id,avatarFilename}:Request):Promise<User>{

    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new AppError('Only authenticated can change avatar',401)
    }

    if(user.avatar){
      //Deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory,user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return user


  }
}

export  {UpdateUserAvatarService}
