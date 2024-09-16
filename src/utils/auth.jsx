import { baseUrl } from './api';
import { validateFetch } from './weatherAPI';

const signup = ({ name, avatarUrl, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatarUrl, email, password }),
  }).then(validateFetch);
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(validateFetch);
};

const verifyToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(validateFetch);
};

export { signup, login, verifyToken };
