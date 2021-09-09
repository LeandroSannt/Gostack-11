import User from '../infra/typeorm/entities/User'

import  IUsersRepository  from "../repositories/IUsersRepository";
import {injectable,inject} from 'tsyringe'


import AppError from '@shared/errors/AppErros'

import IHashProvider  from '../providers/HashProvider/models/IHashProvider'


interface Request{
  name:string,
  password:string,
  email:string
}

@injectable()
class CreateUserService{

  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashprovider: IHashProvider,

    ){}


   public async execute({name,email,password}:Request):Promise<User>{

     const checkUserExists = await this.usersRepository.findByEmail(email)

     if(checkUserExists){
       throw new AppError("Email addres alread used")
     }

     const hashedPassword = await this.hashprovider.generateHash(password)

     const user = await this.usersRepository.create({
       name,
       email,
       password: hashedPassword
     })

     return user

   }

}

export {CreateUserService}

