import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:5000', // emulator -> localhost mapping; adjust for device
  timeout: 10000,
});

export default instance;
