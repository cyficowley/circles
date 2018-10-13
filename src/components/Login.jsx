import React, { Component } from 'react';
import symbol from '../symbol.svg'
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import {Link} from 'react-router-dom'


class Login extends Component {
  render() {
    return (
			<div className="Login">
				<h3 id="name">Circles</h3>
				<input className="login-field" type="text" placeholder="Username"></input>
				<input id="password" className="login-field" type="text" placeholder="Password"></input>
				<Link to="/account"><a id="login-button" class="waves-effect waves-light btn">Login</a></Link>
				<Link to="/signup"><a id="login-button" class="waves-effect waves-light btn">Sign Up</a></Link>
			</div>
    );
  }
}

export default Login;