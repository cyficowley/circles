import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import QRCode from "qrcode.react";



class QRGenerator extends Component {
  render() {
    return (
      <div>
        {this.props.url}
        <div style={{padding:"10px", backgroundColor:"white", width:"fit-content"}}>
          <QRCode value={this.props.url}/>
        </div>
      </div>
    );
	}
}

export default QRGenerator;
