import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Home from '../../routes/home/Home';
import UsersPage from '../../routes/UsersPage/UsersPage';
import VariantsPage from '../../routes/VariantsPage/VariantsPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <Router >
      <div className="App">
        <Sidebar />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/users-page" component={UsersPage} />
          <Route path="/variants-page" component={VariantsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
