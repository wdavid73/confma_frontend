import axios from 'axios'
import { API_CONSTANT_MAP } from './api/index'

export const getCloth = () => {
    return axios.get(API_CONSTANT_MAP.cloth, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.data
    })
}

export const createCloth = (name, color, size, fashion, image) => {
    let data = new FormData()
    data.append('name', name)
    data.append('color', color)
    data.append('size', size)
    data.append('fashion', fashion)
    data.append('image', image, image.name)

    console.log(image)
    console.log(image.name)

    return axios.post(API_CONSTANT_MAP.cloth, data,
        {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            res => {
                console.log(res)
            }
        )
}
