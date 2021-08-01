import React, {useState,FormEvent, useEffect} from 'react'

import api from '../../services/api'

import {useRouteMatch, Link,useParams} from 'react-router-dom'

import {Header,RepositoryInfo,Issues} from './styles'
import logo from '../../assets/github2.svg'

import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'


interface RepositoryParams {
  repository:string
}


interface Infos {
  forks:number;
  stargazers_count:number;
  watchers:number;
  full_name: string;
  description: string;
  owner:{
    login:string;
    avatar_url:string;
    repos_url:string;
  }

}


const Repository: React.FC = () => {
  const {params} = useRouteMatch<RepositoryParams>()

  const [repo,setRepo] = useState<Infos>()
  const [userRepo,setUserRepo] = useState<Infos>()

    useEffect(() => {
      async function loadRepository() {
        const response = await api.get<Infos>(`repos/${params.repository}`)

        const repository = response.data;
        console.log(repository)

        setRepo(repository)

      }
      loadRepository()
    },[params])

    useEffect(() => {
      async function listRepositories() {
        const response = await api.get<Infos>(`users/${repo?.owner.login}/repos`)
        console.log(response.data)

        setUserRepo(response.data)
      }
      listRepositories()
    },[])

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
        <img src={repo?.owner.avatar_url} alt={repo?.full_name} />
        <div>
          <strong>{repo?.full_name }</strong>
          <p>{repo?.description}</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>{repo?.stargazers_count}</strong>
          <span>Stars</span>
        </li>

        <li>
          <strong>{repo?.forks}</strong>
          <span>Forks</span>
        </li>

        <li>
          <strong>{repo?.watchers}</strong>
          <span>Issues</span>
        </li>

      </ul>
    </RepositoryInfo>


    <Issues>
       <Link to="egweg">


        <div>
          <strong>{}</strong>
          <p></p>
        </div>

        <FiChevronRight size={20}/>
        </Link>
    </Issues>
    </>



  )
}

export default Repository
