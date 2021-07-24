import {Request, Response} from 'express'
import createUser from './services/CreateUser'


export function hellowolrd(req:Request,res:Response){
    const user = createUser({
        senha:"leandro",
        techs:[
        'node',
        'react',
        {title:'title',experience:100},
        
    ]
    })


    return res.json({message:"ola mundo"})
}