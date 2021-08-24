import styled from 'styled-components';

export const Container = styled.div`
      background: #232129 ;
      border-radius: 10px;
      border:2px solid #232129;
      padding: 16px;
      width: 100%;
      
      display: flex;
      align-items: center;

      & + div {
          margin-top:8px
        }

input{
    flex: 1;
    border: 0;
    background: transparent !important;
    display: flex;
    color: #fff;
      
        
    }

    input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #232129 inset;
    }

    /* Cor do texto do autocomplete */
    input:-webkit-autofill {
        -webkit-text-fill-color: #fff !important;
    }

    svg{
      margin-right: 16px;
    }

`
