import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import QRCode from "qrcode.react";


class QRGenerator extends Component {
  render() {
    return (
      <div className="Login">
        <div style={{padding:"10px", backgroundColor:"white", width:"fit-content", margin:"0 auto"}}>
          <QRCode value={this.props.url}/>
        </div>
        <p style={{color:"white", fontSize:"1.5rem", textAlign:"center"}}>{this.props.url}</p>
      </div>
    );
	}
}

export default QRGenerator;
