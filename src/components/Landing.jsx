import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import symbol from '../symbol.svg'
import {Link} from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
			<div>
				<div className="headerthing">
					<img style={{float:"left", transform:"scale(.5)"}} src={symbol}></img>
					<h3>Circles</h3>
				</div>
				<div className="App">
					<Link to="/login" className="login-button waves-effect waves-light btn">Account</Link>
					<Link to="/account" className="login-button waves-effect waves-light btn">Scan</Link>
				</div>
			</div>
    );
	}
}

export default Landing;


