import axios from 'axios'
let APIkit = axios.create({
    // baseURL: 'https://khojodoctor.in/api/',
    // baseURL: 'http://192.168.114.29:8080/api/',
    baseURL: 'http://localhost:8080/api/',
    timeout: 10000
});
export default APIkit