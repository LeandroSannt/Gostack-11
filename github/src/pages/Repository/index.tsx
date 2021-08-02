import React, {useState, useEffect} from 'react'
import {useRouteMatch, Link} from 'react-router-dom'

import api from '../../services/api'


import {Header,RepositoryInfo,Issues} from './styles'
import logo from '../../assets/github2.svg'

import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'


interface RepositoryParams {
  repository:string;
}

interface Infos {
  forks:number;
  stargazers_count:number;
  watchers:number;
  full_name: string;
  open_issues_count:number;
  description: string;
  owner:{
    login:string;
    avatar_url:string;
    repos_url:string;
  }

}

interface Issue{
  title:string;
  id:string;
  html_url:string;
  user:{
    login:string;
  }
}

const Repository: React.FC = () => {
  const {params} = useRouteMatch<RepositoryParams>()

  const [repository,setRepository] = useState<Infos | null>(null)
  const [issues,setIssues] = useState<Issue[]>([])

    useEffect(() => {

        api.get(`repos/${params.repository}`).then((response) => {
          setRepository(response.data)
        })

        api.get(`repos/${params.repository}/issues`).then((response) => {
          setIssues(response.data)
        })

        // async function loadData() : Promise<void>{
        //   const [repository,issues] = await Promise.all ([
        //     api.get(`repos/${params.repository}`),
        //     api.get(`repos/${params.repository}/issues`),
        //   ])

        //   console.log(repository)
        //   console.log(issues)
        // }

        // loadData()

    },[params.repository])

    // useEffect(() => {
    //   async function listRepositories() {
    //     const response = await api.get<Infos>(`users/${name_user_repository}/repos`)


    //     console.log(response)

    //     setUserRepo(response.data)
    //   }
    //   listRepositories()
    // },[])

  return(
    <>
    <Header>
      <img src={logo} alt="Github explorer" />
      <Link to="/">
        <FiChevronLeft size={16}/>
        Voltar
      </Link>
    </Header>

    {repository ? (

      <RepositoryInfo >
        <header>
          <img src={repository.owner.avatar_url} alt={repository.full_name} />
          <div>
            <strong>{repository.full_name }</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>

          <li>
            <strong>{repository.forks}</strong>
            <span>Forks</span>
          </li>

          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>

        </ul>
      </RepositoryInfo>
    ) : (
      <p>Carregando</p>
    )}

    <Issues>
          {issues.map(issue =>(
             <a key={issue.id} href={issue.html_url}>
              <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20}/>
            </a>
          ))}
    </Issues>
    </>
  )
}

export default Repository
