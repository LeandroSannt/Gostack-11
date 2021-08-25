import styled, {css} from 'styled-components';

interface ContainerProps{
  isFocused:boolean
  isFilled:boolean
}


export const Container = styled.div<ContainerProps>`
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

        //mudar a cor e borda do input
        ${props => props.isFocused && css`
          color:#ff9000;
          border-color: #ff9000;
          box-shadow: 0px 0px 4px 0px #ff9000;
        `}

        //mudar a cor do que tiver dentro do input
        ${props => props.isFilled && css`
          color:#ff9000;
        `}

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
