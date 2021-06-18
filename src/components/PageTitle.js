import styled from 'styled-components';

export default function Title ({ children }) {
  return (
    <Container>
      <StyledTitle>
        { children }
      </StyledTitle>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0px;
  background-image: linear-gradient(to right, rgb(72,61,139), rgb(79, 67, 153));
  width: 100%;
  padding: 120px 20px 0;
  z-index: 2;
`;

const StyledTitle = styled.h1`
  font-size: 2.4em;
  font-weight: bold;
  letter-spacing: 1px;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--colors-main);
  color: #FFF;
  text-transform: uppercase;
`;
