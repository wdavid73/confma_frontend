import React from 'react';
import { Route } from "react-router-dom";

import Menu from './Menu'
import Welcome from './Welcome'
import Client from '../Client'
import Cloth from '../Cloth'
import ClientFind from '../actions/ClientFind'


const Rutas = () => {
    return (
        <Menu>
            <div>
                <Route exact path='/' component={Welcome} />{" "}
                <Route exact path='/clients' component={Client} />{" "}
                <Route exact path='/clients/find' component={ClientFind} />{" "}
                <Route exact path='/cloth' component={Cloth} />{" "}
            </div>
        </Menu>
    )
}
export default Rutas

