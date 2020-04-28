import axios from 'axios'
import { API_CONSTANT_MAP } from './api/index'

export const getClothWithOutQuotation = () => {
    return axios.get(API_CONSTANT_MAP.quotation_cloth, {
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(res => {
        return res.data
    })
}