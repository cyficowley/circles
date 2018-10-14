import React, { Component } from 'react';
import symbol from '../symbol.svg'
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import {Link} from 'react-router-dom'


class Login extends Component {

	signin = () => {
		this.props.updateUID(document.getElementById('username').value)
		setTimeout(() => {this.props.history.push("/circles")}, 500);
	}
  render() {
    return (
			<div className="Login">
				<Link to="/"><h3 id="name">Circles</h3></Link>
				<input id="username" className="login-field" type="text" placeholder="Username"></input>
				<a onClick={this.signin} className="login-button waves-effect waves-light btn">Login</a>
				<Link to="/signup" className="login-button waves-effect waves-light btn">Sign Up</Link>
			</div>
    );
  }
}

export default Login;
