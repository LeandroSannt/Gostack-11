import React from 'react'

import api from '../../services/api'


import {useRouteMatch, Link} from 'react-router-dom'

import {Header,RepositoryInfo,Issues} from './styles'
import logo from '../../assets/github2.svg'

import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'




interface RepositoryParams {
  repository:string
}


interface infos {
  forks:number
}


const Repository: React.FC = () => {
  const {params} = useRouteMatch<RepositoryParams>()





  return(
    <>
    <Header>
      <img src={logo} alt="Github explorer" />
      <Link to="/dashboard">
        <FiChevronLeft size={16}/>
        Voltar
      </Link>
    </Header>


    <RepositoryInfo >
      <header>
        <img src="https://avatars.githubusercontent.com/u/38533080?v=4" alt="rocketseat" />
        <div>
          <strong>Rocketseat/unform</strong>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi cum delectus</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>18008</strong>
          <span>Stars</span>
        </li>

        <li>
          <strong>48</strong>
          <span>Forks</span>
        </li>

        <li>
          <strong>67</strong>
          <span>Issues</span>
        </li>

      </ul>
    </RepositoryInfo>


    <Issues>
       <Link to="egweg">
        <div>
          <strong></strong>
          <p></p>
        </div>

        <FiChevronRight size={20}/>
        </Link>
    </Issues>
    </>



  )
}

export default Repository
