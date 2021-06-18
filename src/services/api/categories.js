import api from './api';

export function list () {
  return api.get('/categories');
}

export function create (name) {
  return api.post('/categories', {
    name
  });
}
