import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from '../components/PageContainer';

import Title from '../components/Form/Title';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

import * as api from '../services/api/customers';

export default function Customer () {
  const history = useHistory();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [cpf, setCPF] = useState('');

  function submit (event) {
    event.preventDefault();

    api.create(
      name,
      phone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', ''),
      cpf.replaceAll('.', '').replaceAll('-', ''),
      birthday.split('/').reverse().join('-')
    ).then(() => {
      history.push('/customers');
    }).catch(err => {
      console.error(err);
      alert('Não foi possível criar cliente!');
    });
  }

  return (
    <PageContainer title={`Novo Cliente ${name.length ? '-' : ''} ${name}`}>
      <form onSubmit={submit}>
        <Title>Nome</Title>
        <Input value={name} onChange={e => setName(e.target.value)} />

        <Title>Telefone</Title>
        <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(XX) XXXXX-XXXX" />

        <Title>Aniversário</Title>
        <Input value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="DD/MM/AAAA" />

        <Title>CPF</Title>
        <Input value={cpf} onChange={e => setCPF(e.target.value)} placeholder="XXX.XXX.XXX-XX" />

        <Button>Salvar Cliente</Button>
      </form>
    </PageContainer>
  )
}
