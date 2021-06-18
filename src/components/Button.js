import styled from 'styled-components';

const Button = styled.button`
  border: none;
  padding: 8px;
  background-color: ${props => props.background};
  border-radius: 4px;
  color: ${props => props.color || '#FFF'};
  cursor: pointer;
  font-size: 1.2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.2);
  }
`;

export default Button;
