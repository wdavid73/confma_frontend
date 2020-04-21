import React from 'react'
import { Drawer, Button } from 'antd';
import { getCloth, createCloth } from '../js/ClothFuntions'


export default class DrawerCloth extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
            cloths: [],
            visible: false
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    showDrawer = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileSelecterhandler = e => {
        this.setState({
            image: e.target.files[0]
        })
    }


    onSubmit = (e) => {
        e.preventDefault()
        createCloth(
            this.state.name,
            this.state.color,
            this.state.size,
            this.state.fashion,
            this.state.image
        )
        this.setState({
            name: '',
            color: '',
            size: '',
            fashion: '',
            image: null,
        })
        this.onClose()

    }

    render() {
        return (
            <h2>DRAWER</h2>
        )
    }
}
