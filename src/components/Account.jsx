import React, { Component } from 'react';
import symbol from '../symbol.svg'
import 'materialize-css/dist/css/materialize.min.css';
import '../css/main.css';
import {Link} from 'react-router-dom'
import QrReader from "react-qr-reader";



class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result"
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p style={{color:"#fff"}}>{this.state.result}</p>
      </div>
    );
	}
}

export default Account;
