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
      this.props.history.push(data.slice(data.indexOf("/", 8)))
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <div className="Login">
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%"}}
        />
        {/* <p style={{color:"#fff"}}>{this.state.result}</p> */}
        <div className = "scan">
        <Link style={{margin:"0 auto", marginTop: "50px", fontSize: "24px"}} to="/" class="login-button waves-effect waves-light btn">GET OUT</Link>
        </div>
      </div>
    );
	}
}

export default Account;
