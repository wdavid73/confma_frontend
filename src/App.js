import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.dark.css'
import Rutas from './components/common/Rutas'

function App() {
  return (
    <div className="App">
      <Router>
        <Rutas />
      </Router>
    </div>
  );
}

export default App;
