import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://delivery-food-back-yqm5.onrender.com/api',
  //baseURL: 'http://localhost:5000/api',
});

export default instance;
