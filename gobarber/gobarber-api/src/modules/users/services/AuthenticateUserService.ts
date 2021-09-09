import User from '../infra/typeorm/entities/User'
import authconfig from '@config/auth'
import AppError from '@shared/errors/AppErros'
import {injectable,inject} from 'tsyringe'

import  IUsersRepository  from "../repositories/IUsersRepository";

import IHashProvider  from '../providers/HashProvider/models/IHashProvider'

import {sign} from 'jsonwebtoken'


interface Request{
  email:string
  password:string
}

interface Response{
  user:User;
  token:string
}
@injectable()
class AuthenticateUserService{

  constructor(
    @inject('UsersRepository')
     private usersRepository:IUsersRepository,

    @inject('HashProvider')
    private hashprovider: IHashProvider,

     ){}

  public async execute({ email, password}:Request):Promise<Response>{

    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('not user',401)
    }

    const passwordMatched = await this.hashprovider.compareHash(password, user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination',401)

    }

    const token = sign({}, authconfig.jwt.secret,{
      subject:user.id,
      expiresIn: authconfig.jwt.expiresIn,
    })


    return{
      user,
      token
    }

  }
}

export default AuthenticateUserService
