import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaHistory, FaChessBoard, FaGamepad } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';

import logo from '../assets/images/logo.png';

export default function Sidebar () {
  const history = useHistory();

  return (
    <Container collapsed>
      <Logo>
        <img src={logo} alt="BoardCamp Logo" />
      </Logo>

      <MenuItem onClick={() => history.push('/rentals')}>
        <FaHistory />
        Aluguéis
      </MenuItem>

      <MenuItem onClick={() => history.push('/customers')}>
        <BsFillPeopleFill  />
        Clientes
      </MenuItem>

      <MenuItem onClick={() => history.push('/games')}>
        <FaChessBoard />
        Jogos
      </MenuItem>

      <MenuItem onClick={() => history.push('/categories')}>
        <FaGamepad />
        Categorias
      </MenuItem>
    </Container>
  );
}

const Container = styled.aside`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  width: var(--sidebar-width);
  background-color: var(--colors-main);
  color: #FFF;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  position: sticky;
  top: 0;
  z-index: 2;
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const MenuItem = styled.button`
  cursor: pointer;
  border-radius: 4px;
  width: 252px;
  border: none;
  padding: 16px 16px 16px 45px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, .15);
  color: white;
  font-size: 1.1em;

  word-break: break-all;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, .3);
  }

  svg {
    position: absolute;
    left: 16px;
  }
`;
