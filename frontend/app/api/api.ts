import axios from 'axios'

const api = axios.create({
    baseURL:'https://free.leojstore.xyz'
})

export default api