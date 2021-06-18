import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import PageContainer from '../components/PageContainer';

import Title from '../components/Form/Title';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';

import * as customersApi from '../services/api/customers';
import * as gamesApi from '../services/api/games';
import * as api from '../services/api/rentals';

export default function NewRental () {
  const history = useHistory();

  const [customers, setCustomers] = useState(null);
  const [games, setGames] = useState(null);

  const [chosenCustumer, setChosenCustomer] = useState(null);
  const [chosenGame, setChosenGame] = useState(null);
  const [rentDays, setRentDays] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    customersApi.list().then(customers => {
      setCustomers(customers.map(c => ({ value: c.id, label: `${c.name} - ${c.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}` })));
    }).catch(err => {
      console.error(err);
      alert('Não foi possível obter lista de clientes!');
    });

    gamesApi.list().then(games => {
      setGames(games.map(g => ({ value: g.id, label: g.name })));
    }).catch(err => {
      console.error(err);
      alert('Não foi possível obter lista de jogos!');
    });
  }, []);

  function submit (event) {
    event.preventDefault();

    setLoading(true);
    
    api.rent(chosenCustumer, chosenGame, rentDays).then(() => {
      setLoading(false);
      history.push('/rentals');
    }).catch(err => {
      console.error(err);
      alert('Não foi possível alugar jogo!');
      setLoading(false);
    });
  }
  
  return (
    <PageContainer title="Novo Aluguel">
      <form onSubmit={submit}>
        <Title>Cliente</Title>
        <Select options={customers} isLoading={customers === null} placeholder="Selecione um cliente..." onChange={customer => setChosenCustomer(customer.value)} />

        <Title>Jogo</Title>
        <Select options={games} isLoading={games === null} placeholder="Selecione um jogo..." onChange={game => setChosenGame(game.value)} />

        <Title>Quantidade de Dias</Title>
        <Input type="number" placeholder="Digite a quantidade de dias..." value={rentDays} onChange={e => setRentDays(e.target.value)} />

        <Button isLoading={loading}>Alugar</Button>
      </form>
    </PageContainer>
  )
}
