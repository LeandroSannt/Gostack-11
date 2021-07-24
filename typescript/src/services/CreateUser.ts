
interface TechObject{
    title: string
    experience:number
}

interface CreateUserData{
    name?:string
    email?:string
    senha:string | boolean
    techs:Array<string | TechObject>
}

export default function createUser({name,email,senha}:CreateUserData){

    const user={
        name,
        email,
        senha
    }

    return user

}