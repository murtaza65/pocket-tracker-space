import axios from 'axios';

const api = axios.create({
  ///baseURL: 'http://localhost:5000',
   baseURL:'https://json-api-ndsa.onrender.com'
});

export const fetchDonations = async () => {
  const response = await api.get('/donations');
  console.log("Res",response)
  return response.data;
};

export const addDonation = async (donation) => {
  const response = await api.post('/donations', donation);
  console.log("Res",response)
  return response.data;
};
