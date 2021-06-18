import api from './api';

export function list (customerId, gameId) {
  const query = {};

  if (customerId) query.customerId = customerId;
  if (gameId) query.gameId = gameId;

  return api.get(`/rentals`, null, query);
}

export function rent (customerId, gameId, daysRented) {
  return api.post('/rentals', {
    customerId,
    gameId,
    daysRented
  });
}

export function returnRental (rentalId) {
  return api.post(`/rentals/${rentalId}/return`);
}

export function destroy (rentalId) {
  return api.delete(`/rentals/${rentalId}`);
}
