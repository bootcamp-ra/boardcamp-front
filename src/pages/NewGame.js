import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import PageContainer from '../components/PageContainer';

import Title from '../components/Form/Title';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

import * as categoriesApi from '../services/api/categories';
import * as api from '../services/api/games';

export default function Customer () {
  const history = useHistory();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [stockTotal, setStockTotal] = useState(0);

  useEffect(() => {
    categoriesApi.list().then(categories => {
      setCategories(categories.map(c => ({ value: c.id, label: c.name })));
    }).catch(err => {
      console.error(err);
      alert('Não foi possível obter categorias para criação de jogo!');
    })
  }, []);

  function submit (event) {
    event.preventDefault();

    api.create(
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay
    ).then(() => {
      history.push('/games');
    }).catch(err => {
      console.error(err);
      alert('Não foi possível criar categoria!');
    });
  }

  return (
    <PageContainer title={`Novo Jogo ${name.length ? '-' : ''} ${name}`}>
      <form onSubmit={submit}>
        <Title>Nome</Title>
        <Input value={name} onChange={e => setName(e.target.value)} />

        <Title>Imagem</Title>
        <Input value={image} onChange={e => setImage(e.target.value)} />

        <Title>Categoria</Title>
        <Select options={categories} isLoading={categories === null} placeholder="Selecione uma categoria..." onChange={category => setCategoryId(category.value)} />

        <Title>Preço por Dia</Title>
        <Input value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} type="number" />

        <Title>Quantidade total do estoque</Title>
        <Input value={stockTotal} onChange={e => setStockTotal(e.target.value)} type="number" />

        <Button>Salvar Categoria</Button>
      </form>
    </PageContainer>
  )
}
