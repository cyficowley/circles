import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import symbol from '../symbol.svg'
import {Link} from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
			<div className="App">
				<img src={symbol}></img>
				<h1 id="name">Circles</h1>
				<Link to="/login"><a id="login-button" class="waves-effect waves-light btn">Login</a></Link>
			</div>
    );
  }
}

export default Landing;


