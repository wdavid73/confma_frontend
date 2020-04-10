import axios from 'axios'


export const getClients = () => {
    return axios.get('http://127.0.0.1:8000/api/clients/', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.data
    })

}
