import React from 'react';
import { Route } from "react-router-dom";

import Menu from './Menu'
import Welcome from './Welcome'
import Client from '../Client'

import Cloth from '../Cloth'
import Rental from '../Rental'
import RentalList from '../RentalList'
import ClientFind from '../actions/ClientFind'
import Quotation from '../quotation/quotation'


const Rutas = () => {
    return (
        <Menu>
            <div>
                <Route exact path='/' component={Welcome} />{" "}
                <Route exact path='/clients' component={Client} />{" "}
                <Route exact path='/clients/find' component={ClientFind} />{" "}
                <Route exact path='/cloth' component={Cloth} />{" "}
                <Route exact path='/rental' component={Rental} />{" "}
                <Route exact path='/rental/list' component={RentalList} />{" "}
                <Route exact path='/quotation' component={Quotation}/>
            </div>
        </Menu>
    )
}
export default Rutas

