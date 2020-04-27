import axios from 'axios'
import { API_CONSTANT_MAP } from './api/index'

let date_now = new Date()

export const getRental = () => {
    return axios.get(API_CONSTANT_MAP.rental, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}

export const refundRental = (rentalId) => {
    let id = rentalId.toString()
    return axios.post(API_CONSTANT_MAP.refundRental + id + '/', {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        console.log(res)
    })
}


export const getClothWithOutRental = () => {
    return axios.get(API_CONSTANT_MAP.rental_cloth, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.data
    })

}

export const createRental = (date_return, price, cloth, client) => {
    let return_date = new Date(date_return)
    if (date_now < return_date && parseInt(price) >= 5000){
        return axios.post(API_CONSTANT_MAP.rental, {
            date_return: date_return,
            price: price,
            clothId: cloth,
            clientId: client,
        },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(res => {
            console.log(res)
        })
    }else{
        console.log("Fecha mal ingresada o precio menor a 5000")
    }
}