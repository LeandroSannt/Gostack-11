import React,{createContext,useCallback, useState,useContext} from 'react'

import api from '../services/api'

interface SignInCredentials{
  email:string;
  password:string;
}

interface AuthContextState{
  user:Object;
  signIn(credentials:SignInCredentials):Promise<void>;
  signOut():void;
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

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token")
    localStorage.removeItem("@GoBarber")

    setData({} as AuthState)

  },[])

  return (
    <AuthContext.Provider value ={{user:data.user, signIn,signOut}}>
     {children}
     </AuthContext.Provider>
  )
}

function useAuth(): AuthContextState{
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('insira o authprovider ao redor do seu elemento')
  }
  return context
}

export {AuthProvider, useAuth}
