import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token')

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5070/api',
    headers:{
        Authorization: token
    }
})


export default instance 