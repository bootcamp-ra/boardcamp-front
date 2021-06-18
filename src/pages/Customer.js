import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import PageContainer from '../components/PageContainer';
import Loading from '../components/Loading';
import RentalsTable from '../components/RentalsTable';
import Editable from '../components/Form/Editable';

import * as rentalsApi from '../services/api/rentals';
import * as api from '../services/api/customers';

export default function Customer () {
  const params = useParams();
  const id = +params.customerId;

  const [customer, setCustomer] = useState(null);
  const [rentals, setRentals] = useState(null);

  useEffect(() => {
    fetchCustomer();
    fetchRentals();
  }, [id]);

  function fetchCustomer () {
    api.getById(id).then(customer => {
      setCustomer(customer);
    }).catch(err => {
      console.error(err);
      alert('Não foi possível buscar dados do cliente!');
    });
  }

  function fetchRentals () {
    rentalsApi.list(id).then(rentals => {
      setRentals(rentals);
    }).catch(err => {
      console.error(err);
      alert('Não foi possível obter lista de alugéis do cliente!');
    });
  }

  function updateBirthday (birthday) {
    birthday = birthday.split('/').reverse().join('-');
    update({ birthday });
  }

  function updatePhone (phone) {
    phone = phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
    update({ phone });
  }

  function updateName (name) {
    update({ name });
  }

  function updateCPF (cpf) {
    cpf = cpf.replaceAll('.', '').replaceAll('-', '');
    update({ cpf });
  }

  function update({
    id = customer.id,
    name = customer.name,
    phone = customer.phone,
    cpf = customer.cpf,
    birthday = customer.birthday
  }) {
    api.updateCustomer(id, name, phone, cpf, birthday).then(() => {
      fetchCustomer();
    }).catch(err => {
      console.error(err);
      alert('Não foi possível editar o cliente!');
      fetchCustomer();
    });
  }

  if (!customer) return <Loading />;

  return (
    <PageContainer title={`Cliente - ${customer.name}`}>
      <SectionTitle>
        Informações de {customer.name}
      </SectionTitle>

      <div style={{ fontSize: '12px', color: '#BBB', marginBottom: '10px' }}>Clique num dado para editá-lo</div>

      <Container>
        <Info>
          <Title>Nome:</Title>
          <Editable value={customer.name} onChange={updateName} />
        </Info>

        <Info>
          <Title>Telefone:</Title>
          <Editable
            value={
              customer.phone.length === 11
              ? customer.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
              : customer.phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
            }
            onChange={updatePhone}
          />
        </Info>

        <Info>
          <Title>Aniversário:</Title>
          <Editable value={dayjs(customer.birthday).format('DD/MM/YYYY')} onChange={updateBirthday} />
        </Info>

        <Info>
          <Title>CPF:</Title>
          <Editable value={customer.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')} onChange={updateCPF} />
        </Info>
      </Container>

      <SectionTitle>
        Aluguéis de {customer.name}
      </SectionTitle>

      <RentalsTable rentals={rentals} onAction={fetchRentals} isLoading={rentals === null} height="400px" />
    </PageContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 20px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #EEE;
  }

  &:nth-child(odd) {
    background-color: #F7F7F7;
  }
`;

const Title = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-right: 4px;
  width: 100px;
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  font-size: 1.6em;
  font-weight: bold;
  margin: 20px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid #111;
  color: #111;
  letter-spacing: 1px;
`;
