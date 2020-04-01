import styled from 'styled-components'

export const Container = styled.div `
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${props => props.done ? 0.6 : 1};

  /* estou estilizando toda DIV que antes dela já tenha uma DIV*/
  & + div{
      border-left: 1px solid rgba(0, 0, 0, 0.8);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2{
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }

    button{
      height: 32px;
      width: 34px;
      border-radius: 18px;
      background: #211b20;
      border: 0;
      cursor: pointer;
    }

    button:hover{
      background: #8b65b2;
      opacity: 0.4;
    }
  }

  ul{
    margin-top: 20px;
  }

`;