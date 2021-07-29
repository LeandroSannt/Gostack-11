import React from 'react'
import { Title,Form,Repositories } from './styles'

import {FiChevronRight} from 'react-icons/fi'

import logo from '../../assets/github2.svg'

const Dashboard: React.FC = () => {

  return(
    <>
      <img src={logo} alt="logo explorer"/>
      <Title>Explore repositorios no Github</Title>


    <Form action="">
      <input type="text" placeholder="Digite o nome do repositorio" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="teste">
        <img src="https://avatars.githubusercontent.com/u/38533080?v=4" alt="leandro santos" />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectu</p>
        </div>

        <FiChevronRight size={20}/>
      </a>

      <a href="teste">
        <img src="https://avatars.githubusercontent.com/u/38533080?v=4" alt="leandro santos" />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectu</p>
        </div>

        <FiChevronRight size={20}/>
      </a>

      <a href="teste">
        <img src="https://avatars.githubusercontent.com/u/38533080?v=4" alt="leandro santos" />
        <div>
          <strong>rocketseat/unform</strong>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectu</p>
        </div>

        <FiChevronRight size={20}/>
      </a>
    </Repositories>

    </>

  )
}

export default Dashboard
