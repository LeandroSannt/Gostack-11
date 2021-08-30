import React from 'react';
import {Container,Toast} from './styles'
import {FiAlertCircle,FiXCircle} from 'react-icons/fi'

const ToastContainer: React.FC = () => {
  return ( 
    
    <Container>
      <Toast hasDescription={true}>
        <FiAlertCircle size={20}/>

          <div>
            <strong>Aconteceu um error</strong>
            <p>Não foi possivel fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size= {18}/>
          </button>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20}/>

          <div>
            <strong>Aconteceu um error</strong>
           
          </div>

          <button type="button">
            <FiXCircle size= {18}/>
          </button>
      </Toast>

      <Toast type="error" hasDescription={true}>
        <FiAlertCircle size={20}/>

          <div>
            <strong>Aconteceu um error</strong>
            <p>Não foi possivel fazer login na aplicação</p>
          </div>

          <button type="button">
            <FiXCircle size= {18}/>
          </button>
      </Toast>
    </Container>
  )
}

export default ToastContainer