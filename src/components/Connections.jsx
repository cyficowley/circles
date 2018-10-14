import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';
import {Link} from 'react-router-dom'

class Connections extends Component {
  constructor(props){
    super(props);
    this.state = {data:undefined}
    this.cookies = new Cookies();

    if(this.props.uid){
      console.log("getting firebase shit")
      database.getAllConnections(this.props.uid, (data) => {
        this.setState({data:data})
      })
    }
    else{
      let connections = {}
      if(this.cookies.get('connections')){
        connections = this.cookies.get('connections');
      }
      this.state = {data:connections}
    }
  }

  render() {
    let rows = [];
    if(this.state.data){
      Object.keys(this.state.data).forEach((person, index)=>{
        rows.push(<div className="YEET" key={this.state.data[person]["comment"]}>
          <h3 style={{marginTop:0}}>{person}</h3>
          {this.state.data[person]["comment"] &&
          <p>{this.state.data[person]["comment"]}</p>}
        </div>)
        delete this.state.data[person]["comment"]
        Object.keys(this.state.data[person]).forEach(key => {
          rows.push(
            <div key={key} className="item">
              <h4 style={{marginTop:0}}>{key}</h4>
              {this.state.data[person][key][0] &&
                <p>Link to <a href={this.state.data[person][key][0]} target="_blank">{key}</a></p>
              }
              {this.state.data[person][key][1] &&
                <p>{this.state.data[person][key][1]}</p>
              }
            </div>
          )
        })
        if(index !== Object.keys(this.state.data).length - 1){
          rows.push(<div className="devider"></div>)
        }
      })

      
    }
    return (
			<div className="Connect Login" style={{padding:0}}>
        <div style={{marginLeft:"10px",marginRight:"10px"}}>
          {rows}
        </div>
        <div style={{marginLeft:"10px",marginRight:"10px"}}>
          <Link to="/" className="login-button waves-effect waves-light btn">Home</Link>
          <Link to="/home" className="login-button waves-effect waves-light btn">Share Circles</Link>
          {!this.props.uid && 
            <Link to="/signup" className="login-button waves-effect waves-light btn">Sign up to save connections</Link>
          }
        </div>
			</div>
    );
  }
}

export default Connections;