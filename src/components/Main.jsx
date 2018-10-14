import React, { Component } from 'react';
import '../css/main.css';
import Landing from './Landing.jsx'
import Login from './Login.jsx'
import Account from './Account.jsx'
import Signup from './Signup.jsx'
import symbol from '../symbol.svg'
import Connect from './Connect.jsx'
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
          <Route path="/connect" component={Connect} />
          <Route path="/signup/:step" component={Signup}/>
        </div>
      </BrowserRouter>

    );
  }
}

export default Main;
