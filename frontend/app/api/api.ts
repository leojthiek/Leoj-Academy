import axios from 'axios'

const api = axios.create({
    baseURL:'http://52.91.114.24:5000'
})

export default api