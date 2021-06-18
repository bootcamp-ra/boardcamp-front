import { useState } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import useInterval from 'react-useinterval';

export default function Loading () {
  const [ellipsis, setEllipsis] = useState('...');

  useInterval(() => {
    if (ellipsis.length === 3) setEllipsis('');
    else setEllipsis(ellipsis + '.');
  }, 333);

  return (
    <Container>
      <Loader type="ThreeDots" color="var(--colors-main)" height={80} width={80} />
      Carregando dados{ellipsis}
    </Container>
  )
}

const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  width: calc(100% - var(--sidebar-width));
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
