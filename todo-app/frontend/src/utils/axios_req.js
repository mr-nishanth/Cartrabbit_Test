import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:3500/api/v1/todos',
});

export default request;
