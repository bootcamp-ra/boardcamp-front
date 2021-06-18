import styled from 'styled-components';

import PageTitle from './PageTitle';

export default function PageContainer ({ title, children }) {
  return (
    <Page>
      <PageTitle>{title}</PageTitle>
      <Container>
        { children }
      </Container>
    </Page>
  )
}

const Page = styled.div`
  width: calc(100% - var(--sidebar-width));
  flex-shrink: 0;
  background-color: #FAFAFA;
`;

const Container = styled.div`
  padding: 20px;
`;
