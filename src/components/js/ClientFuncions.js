import axios from 'axios'
import { API_CONSTANT_MAP } from './api/index'


export const getClients = () => {
    return axios.get(API_CONSTANT_MAP.client, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.data
    })

}

export const createClient = (name, last_name, address, phone, cellphone) => {
    return axios.post(API_CONSTANT_MAP.client, {
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

export const updateClient = (name, last_name, address, phone, cellphone, id) => {
    let _id = id.toString()
    return axios.put(API_CONSTANT_MAP.client + _id + '/', {
        name: name,
        last_name: last_name,
        address: address,
        phone: phone,
        cellphone: cellphone
    },
        {
            headers: { 'Content-Type': 'application/json' }
        }
    ).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

export const deleteClient = (id) => {
    return axios.post(API_CONSTANT_MAP.client + 'delete/' + id + '/', {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        console.log(res.data)
        return res.data
    }).catch(err => {
        console.log(err)
    })


}

export const findClient = (id) => {
    return axios.post('http://127.0.0.1:8000/api/clients/find/' + id + '/', {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}