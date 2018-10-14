import React, { Component } from 'react';
import '../css/main.css';
import Landing from './Landing.jsx'
import Login from './Login.jsx'
import Account from './Account.jsx'
import Signup from './Signup.jsx'
import symbol from '../symbol.svg'
import Circles from './Circles.jsx';
import Connect from './Connect.jsx'
import Connections from './Connections.jsx'
import QRGenerator from './QRGenerator.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'


class Main extends Component {
  constructor(props){
    super(props)
    this.state = {uid:undefined}
  }

  updateUID = (uid) => {
    this.setState({uid:uid})
  }
  
  render() {
    console.log(this.state.uid)
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} basename={process.env.PUBLIC_URL} />
          <Route path="/login" component={(props) => <Login history={props.history} updateUID={this.updateUID}/>} />
          <Route path="/account" component={(props) => <Account history={props.history}/>} />
          <Route path="/connect" component={() => <Connect uid={this.state.uid}/>} />
          <Route path="/circles" component={() => <Circles uid={this.state.uid}/>} />
          <Route path="/signup" component={(props) => <Signup history={props.history} updateUID={this.updateUID}/>}/>
          <Route path="/connections" component={() => <Connections uid={this.state.uid}/>} />
          <Route path="/qrgenerator" component={QRGenerator} />
          <Route path="/landing" component={Landing} />

        </div>
      </BrowserRouter>

    );
  }
}

export default Main;
