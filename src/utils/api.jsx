import { validateFetch } from './weatherAPI';

const baseUrl = 'http://localhost:3001';
const headers = {
  'Content-Type': 'application/json',
};

const getItems = () => {
  return fetch(`${baseUrl}/items`).then(validateFetch);
};

const deleteItem = (item) => {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: 'DELETE',
    headers: headers,
  }).then(validateFetch);
};

const postItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(validateFetch);
};

export { getItems, postItem, deleteItem };
