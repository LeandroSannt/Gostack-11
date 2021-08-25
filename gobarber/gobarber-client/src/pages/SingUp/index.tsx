import React, {useCallback} from 'react';
import {Container,Content,Background} from './styles'
import {FiArrowLeft,FiMail,FiLock,FiUser} from 'react-icons/fi'
import * as Yup from 'yup'

import Input from '../../components/Input'
import Button from '../../components/Button'

import imgLogo from '../../assets/logo.svg'
import {Form} from '@unform/web'


const SignUp: React.FC = () => {

 const handleSubmit= useCallback(async(data:object) =>{

    try{
      const schema = Yup.object().shape({
        name:Yup.string().required('Nome obrigatorio'),
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().min(6, 'No minimo 6 digitos')
      })

      await schema.validate(data,{
        abortEarly:false
      })
      
    }catch(err){
      console.log(err)
    }
  },[])

  return(
    <Container>
      <Background></Background>
        <Content>
            <img src={imgLogo} alt="Gobarber" />

            <Form onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser}  placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="password"/>
                <Button type="submit">Cadastar</Button>
            </Form>

            <a href="Criar conta">
                <FiArrowLeft/>
                Volta para logon
            </a>
        </Content>
    </Container>
    )
}

  





export default SignUp;