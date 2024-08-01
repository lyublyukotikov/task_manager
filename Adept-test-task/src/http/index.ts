import axios from 'axios';

const $api = axios.create({
  baseURL: 'https://669d001015704bb0e304d296.mockapi.io/api/adept/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default $api;