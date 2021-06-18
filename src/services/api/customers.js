import api from './api';

export function list () {
  return api.get('/customers');
}

export function getById (customerId) {
  return api.get(`/customers/${customerId}`);
}

export function updateCustomer (customerId, name, phone, cpf, birthday) {
  return api.put(`/customers/${customerId}`, {
    name,
    phone,
    cpf,
    birthday
  });
}

export function create (name, phone, cpf, birthday) {
  return api.post('/customers', {
    name,
    phone,
    cpf,
    birthday
  });
}
