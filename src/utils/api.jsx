import { validateFetch } from './weatherAPI';

const baseUrl = 'http://localhost:3001';

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
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(validateFetch);
};

export { getItems, postItem, deleteItem, baseUrl };
