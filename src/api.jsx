import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchDonations = async () => {
  const response = await api.get('/donations');
  return response.data;
};

export const addDonation = async (donation) => {
  const response = await api.post('/donations', donation);
  return response.data;
};
