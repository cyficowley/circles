import React, { Component } from 'react';
import '../css/main.css';
import Landing from './Landing.jsx'
import Login from './Login.jsx'
import Account from './Account.jsx'
import symbol from '../symbol.svg'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'


class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/account" component={Account} />
        </div>
      </BrowserRouter>

    );
  }
}

export default Main;
