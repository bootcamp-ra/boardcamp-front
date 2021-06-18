import { useHistory } from 'react-router-dom';
import { FaHandHolding, FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';

import Table from './Table';
import Button from './Button';

import * as api from '../services/api/rentals';

export default function RentalsTable ({ rentals, onAction, ...props }) {
  const history = useHistory();

  function destroyRental (rentalId) {
    api.destroy(rentalId).then(() => {
      onAction();
    }).catch(err => {
      console.error(err);
      alert('Não foi possível excluir aluguel!');
    });
  }

  function returnRental (rentalId) {
    api.returnRental(rentalId).then(() => {
      onAction();
    }).catch(err => {
      console.error(err);
      alert('Não foi possível devolver aluguel!');
    });
  }

  return (
    <Table
        columns={[
          { title: 'Jogo', accessor: 'game.name' },
          { title: 'Cliente', accessor: 'customer.name' },
          { title: 'Data do Aluguel', accessor: 'rentDate' },
          { title: 'Dias Alugados', accessor: 'daysRented' },
          { title: 'Devolvido em', accessor: 'returnDate' },
          { title: 'Valor', accessor: 'originalPrice' }
        ]}

        content={rentals}

        onCellClick={{
          'customer.name': row => history.push(`/customers/${row.customer.id}`)
        }}

        formatCellText={{
          rentDate: text => dayjs(text).format('DD/MM/YYYY'),
          returnDate: text => text ? dayjs(text).format('DD/MM/YYYY') : 'Não devolvido',
          originalPrice: (price, row) => `R$ ${((price + row.delayFee) / 100).toFixed(2).replace('.', ',')}`
        }}

        cellStyle={{
          returnDate: (date, row) => 
            (
              (date && dayjs(date).isAfter(dayjs(row.rentDate).add(row.daysRented, 'days'))) ||
              (!date && dayjs().isAfter(dayjs(row.rentDate).add(row.daysRented, 'days')))
            ) && { color: '#FF0000', fontWeight: 'bold' }
        }}

        actions={[
          { title: 'Excluir', onClick: rental => destroyRental(rental.id), component: <Button background="#FA1249"><FaTrash /></Button> },
          { title: 'Devolver', onClick: rental => returnRental(rental.id), component: <Button background="rgb(53,121,220)"><FaHandHolding /></Button> }
        ]}

        {...props}
      />
  )
}
