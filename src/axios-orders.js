import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-bigburger.firebaseio.com/'
});

export default instance;