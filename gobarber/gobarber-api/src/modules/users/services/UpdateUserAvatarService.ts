import {injectable,inject} from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import path from 'path'

import  IUsersRepository  from "../repositories/IUsersRepository";
import  IStorageRepository from "@shared/container/providers/StorageProviders/models/IStorageProvider"

import AppError from '@shared/errors/AppErros'


import fs from 'fs'

interface Request{
  user_id:string
  avatarFilename:string
}
@injectable()
class UpdateUserAvatarService{

  //função da injeção é colocar os metodos que eu criei dentro do service
  constructor(
    @inject('UsersRepository')
     private usersRepository:IUsersRepository,
     @inject('StorageProvider')
     private storageProvider:IStorageRepository,
     ){}

  public async execute({user_id,avatarFilename}:Request):Promise<User>{

    const user = await this.usersRepository.findById(user_id)

    if(!user){
      throw new AppError('Only authenticated can change avatar',401)
    }

    if(user.avatar){
     await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user


  }
}

export  {UpdateUserAvatarService}
