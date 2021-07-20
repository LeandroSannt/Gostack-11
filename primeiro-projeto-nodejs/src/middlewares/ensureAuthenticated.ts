import {Request,Response,NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

import authconfig from '../config/auth'

interface Authenticate{
  request:Request,
  response:Response,
  next:NextFunction
}

export default function ensuredAuthenticated({request,response,next}:Authenticate): void{

  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new Error('JWT is missing')
  }

  const [,token] = authHeader.split('')

  try{
  const decoded = verify(token, authconfig.jwt.secret)

  console.log(decoded)

  return next()

  }catch{
    throw new Error('Invalid JWT token')
  }
}
