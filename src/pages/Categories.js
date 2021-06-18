import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from '../components/PageContainer';
import Loading from '../components/Loading';
import Table from '../components/Table';

import Button from '../components/Form/Button';

import * as api from '../services/api/categories';

export default function Customers () {
  const [categories, setCategories] = useState(null);

  const history = useHistory();

  useEffect(() => {
    api.list().then(categories => {
      setCategories(categories);
    });
  }, []);

  if (!categories) return <Loading />;

  return (
    <PageContainer title="Categorias">
      <Table
        columns={[
          { title: 'Nome', accessor: 'name' },
        ]}

        content={categories}
      />

      <Button onClick={() => history.push('/categories/new')}>Adicionar Categoria</Button>
    </PageContainer>
  );
}

