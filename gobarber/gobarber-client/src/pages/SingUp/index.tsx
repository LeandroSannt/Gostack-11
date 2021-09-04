import React, {useCallback,useRef} from 'react';
import {Container,Content,Background} from './styles'
import {FormHandles} from '@unform/core'
import {FiArrowLeft,FiMail,FiLock,FiUser} from 'react-icons/fi'
import * as Yup from 'yup'

import {Link} from 'react-router-dom'


import getValidationErrors from '../../utils/getValidationErros'

import Input from '../../components/Input'
import Button from '../../components/Button'

import imgLogo from '../../assets/logo.svg'
import {Form} from '@unform/web'


const SignUp: React.FC = () => {
  const formRef= useRef<FormHandles>(null)

//função para validar os campos do formulario
 const handleSubmit= useCallback(async(data:object) =>{
    try{

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name:Yup.string().required('Nome obrigatorio'),
        email:Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password:Yup.string().min(6, 'No minimo 6 digitos')
      })

      await schema.validate(data,{
        abortEarly:false
      })
      
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);
      }
    }
  },[])

  return(
    <Container>
      <Background></Background>
        <Content>
            <img src={imgLogo} alt="Gobarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser}  placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="password"/>
                <Button type="submit">Cadastar</Button>
            </Form>

            <Link to ="/">
                <FiArrowLeft/>
                Volta para logon
            </Link>
        </Content>
    </Container>
    )
}


export default SignUp;