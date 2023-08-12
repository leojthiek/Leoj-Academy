import axios from 'axios'

const api = axios.create({
    baseURL:'https://leojacademy.leojstore.xyz'
})

export default api