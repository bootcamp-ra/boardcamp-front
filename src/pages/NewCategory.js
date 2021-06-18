import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from '../components/PageContainer';

import Title from '../components/Form/Title';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

import * as api from '../services/api/categories';

export default function Customer () {
  const history = useHistory();

  const [name, setName] = useState('');

  function submit (event) {
    event.preventDefault();

    api.create(
      name
    ).then(() => {
      history.push('/categories');
    }).catch(err => {
      console.error(err);
      alert('Não foi possível criar categoria!');
    });
  }

  return (
    <PageContainer title={`Nova Categoria ${name.length ? '-' : ''} ${name}`}>
      <form onSubmit={submit}>
        <Title>Nome</Title>
        <Input value={name} onChange={e => setName(e.target.value)} />

        <Button>Salvar Categoria</Button>
      </form>
    </PageContainer>
  )
}
