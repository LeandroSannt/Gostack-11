import React, {useCallback,useRef}  from 'react';
import {Container,Content,Background} from './styles'
import {FiLogIn,FiMail,FiLock} from 'react-icons/fi'

import {useAuth} from '../../hooks/AuthContext';
import {useToast} from '../../hooks/ToastContext';

import {Form} from "@unform/web"

import Input from '../../components/Input'
import Button from '../../components/Button'

import imgLogo from '../../assets/logo.svg'

import {FormHandles} from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErros'



interface SignInFormData{
  email: string
  password: string
}

const SignIn: React.FC = () => {

  const formRef= useRef<FormHandles>(null)

  const {signIn,user} = useAuth()
  const {addToast} = useToast()
  console.log(user)

//função para validar os campos do formulario
 const handleSubmit= useCallback(async(data:SignInFormData) =>{
    try{

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().required('Senha obrigatoria')
      })

      await schema.validate(data,{
        abortEarly:false
      })
      await signIn({
        email:data.email,
        password:data.password
      })
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);
      }
      addToast({
        title:'Erro na autenticação',
        type:'error',
        description:'ocorreu um erro ao fazer login, cheque as credenciais'
      })
      
    }
  },[signIn,addToast])
  return(

    <Container>
        <Content>
            <img src={imgLogo} alt="Gobarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <Input name="email" icon={FiMail}  placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="Criar conta">
                <FiLogIn/>
                Criar conta
            </a>
        </Content>
        <Background></Background>

    </Container>
  )
}    

export default SignIn;