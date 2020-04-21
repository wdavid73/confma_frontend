import axios from 'axios'

export const getCloth = () => {
    return axios.get('http://127.0.0.1:8000/api/cloths/', {
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

    return axios.post('http://127.0.0.1:8000/api/cloths/', data,
        {
            headers: { 'Content-Type': 'application/json' }
        }).then(
            res => {
                console.log(res)
            }
        )
}
