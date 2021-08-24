import React from 'react';
import {Container,Content,Background} from './styles'
import {FiLogIn,FiMail,FiLock} from 'react-icons/fi'

import Input from '../../components/Input'
import Button from '../../components/Button'

import imgLogo from '../../assets/logo.svg'

const SignIn: React.FC = () => (

    <Container>
        <Content>
            <img src={imgLogo} alt="Gobarber" />

            <form>
                <h1>Faça seu logon</h1>
                <Input name="email" icon={FiMail}  placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </form>

            <a href="Criar conta">
                <FiLogIn/>
                Criar conta
            </a>
        </Content>
        <Background></Background>

    </Container>

    )

export default SignIn;