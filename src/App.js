import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from "react-router-dom";

import 'antd/dist/antd.dark.css'
import Menu from './components/Menu'
import Client from './components/ClientsList'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu>
          <div>
            <Route exact path='/' component={Welcome} />{" "}
            <Route exact path='/clients' component={Client} />{" "}
          </div>
        </Menu>
      </Router>
    </div>
  );
}

export default App;
