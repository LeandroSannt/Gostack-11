import React,{createContext,useCallback, useState} from 'react'

import api from '../services/api'

interface SignInCredentials{
  email:string;
  password:string;
}

interface AuthContextState{
  user:Object;
  signIn(credentials:SignInCredentials):Promise<void>;
}

interface AuthState{
  token:string;
  user:Object
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const AuthContext = createContext<AuthContextState>({} as AuthContextState)

const AuthProvider:React.FC = ({children}) => {

  const [data,setData] =useState<AuthState>(()=>{
   const token = localStorage.getItem("@GoBarber:token")
    const user =localStorage.getItem("@GoBarber")

    if(token && user){
      return {token,user:JSON.parse(user)}
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({email,password}) => {
    const response = await api.post('/sessions',{
      email,
      password
    })

    const {token,user} = response.data

    localStorage.setItem("@GoBarber:token",token)
    localStorage.setItem("@GoBarber",JSON.stringify(user))

    setData({token,user})
  }, [])

  return (
    <AuthContext.Provider value ={{user:data.user, signIn}}>
     {children}
     </AuthContext.Provider>
  )
}

export {AuthProvider,AuthContext}
