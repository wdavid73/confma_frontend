import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from "react-router-dom";

import 'antd/dist/antd.css'
import Menu from './components/Menu'
import Client from './components/ClientsList'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu>
          <Route exact path='/' component={Welcome} />{" "}
          <Route exact path='/clients' component={Client} />{" "}
        </Menu>
      </Router>
    </div>
  );
}

export default App;
