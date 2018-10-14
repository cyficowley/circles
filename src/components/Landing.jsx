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
					<img style={{float:"left", transform:"scale(.4)"}} src={symbol}></img>
					<h3 style={{marginLeft:'-20px'}}>Circles</h3>
				</div>
				<div className="App">
					<br />
					<h1>Connect Smarter</h1>
					<div style={{marginTop:"20vh"}}>
					<Link to="/login" className="landing-button login-button waves-effect waves-light btn"><span>Account</span></Link>
					<Link to="/account" className="landing-button login-button waves-effect waves-light btn"><span>Scan</span></Link>
					</div>
				</div>
			</div>
    );
	}
}

export default Landing;


