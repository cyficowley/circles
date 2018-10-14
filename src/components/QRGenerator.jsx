import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import QRCode from "qrcode.react";
import {Link} from 'react-router-dom'


class QRGenerator extends Component {
  render() {
    return (
      <div className="Login">
        <div style={{padding:"10px", backgroundColor:"white", width:"fit-content", margin:"0 auto"}}>
          <QRCode value={this.props.location.state.url}/>
        </div>
        <p style={{color:"white", fontSize:"1.5rem", textAlign:"center"}}>{this.props.location.state.url}</p>
        <Link to="/circles" className="login-button waves-effect waves-light btn">Home</Link>
      </div>
    );
	}
}

export default QRGenerator;
