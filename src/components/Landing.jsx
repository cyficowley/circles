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
					<div className="landing-bg">
						<br />
						<h1>Discover your Circle</h1>
					</div>	
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


