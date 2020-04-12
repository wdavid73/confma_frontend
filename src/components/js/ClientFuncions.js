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

export const createClient = (name, last_name, address, phone, cellphone) => {
    return axios.post('http://127.0.0.1:8000/api/clients/', {
        name: name,
        last_name: last_name,
        address: address,
        phone: phone,
        cellphone: cellphone
    },
        {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            res => {
                console.log(res)
            }
        )
}