import { useState, useEffect } from 'react';

import PageContainer from '../components/PageContainer';
import Loading from '../components/Loading';
import RentalsTable from '../components/RentalsTable';

import * as api from '../services/api/rentals';

export default function Rentals () {
  const [rentals, setRentals] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData () {
    api.list().then(rentals => {
      setRentals(rentals);
    }).catch(err => {
      console.error(err);
      alert('Não foi possível buscar aluguéis!');
    });
  }

  if (!rentals) return <Loading />;

  return (
    <PageContainer title="Aluguéis">
      <RentalsTable rentals={rentals} onAction={fetchData} />
    </PageContainer>
  );
}
