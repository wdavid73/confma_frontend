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
    console.log(image)
    return axios.post('http://127.0.0.1:8000/api/cloths/', {
        name: name,
        color: color,
        size: size,
        fashion: fashion,
        image: image
    }, {
        headers: { 'Content-Type': 'application/json' }
    }).then(
        res => {
            console.log(res)
        }
    )

}