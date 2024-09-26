import { validateFetch } from './weatherAPI';
import { baseUrl } from './constants';

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(validateFetch);
};

const deleteItem = (item, token) => {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(validateFetch);
};

const postItem = ({ name, weather, imageUrl }, token) => {
  return fetch(`${baseUrl}/items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(validateFetch);
};

const likeItem = (user, itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  }).then(validateFetch);
};

const deleteLike = (user, itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  }).then(validateFetch);
};

export { getItems, postItem, deleteItem, deleteLike, likeItem, baseUrl };
