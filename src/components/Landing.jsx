import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import symbol from '../symbol.svg'
import {Link} from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
			<div className="App">
				<Link to="/login"><img src={symbol}></img></Link>
			</div>
    );
  }
}

export default Landing;


