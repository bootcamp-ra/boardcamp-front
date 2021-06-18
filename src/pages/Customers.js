import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import PageContainer from '../components/PageContainer';
import Loading from '../components/Loading';
import Table from '../components/Table';

import Button from '../components/Form/Button';

import * as api from '../services/api/customers';

export default function Customers () {
  const [customers, setCustomers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    api.list().then(customers => {
      setCustomers(customers);
    });
  }, []);

  if (!customers) return <Loading />;

  return (
    <PageContainer title="Clientes">
      <Table
        columns={[
          { title: 'Nome', accessor: 'name' },
          { title: 'Telefone', accessor: 'phone' },
          { title: 'Aniversário', accessor: 'birthday' },
          { title: 'CPF', accessor: 'cpf' },
        ]}

        content={customers}

        onCellClick={{
          name: row => history.push(`/customers/${row.id}`)
        }}

        formatCellText={{
          'birthday': birthday => dayjs(birthday).format('DD/MM/YYYY'),
          'phone': phone => phone.length === 11 ? phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3') : phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3'),
          'cpf': cpf => cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
        }}
      />

      <Button onClick={() => history.push('/customers/new')}>Adicionar Cliente</Button>
    </PageContainer>
  );
}

