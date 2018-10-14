import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';
import {Link} from 'react-router-dom'

class Connect extends Component {
  constructor(props){
    super(props);
    this.state = {data:undefined}
    this.getData(this.props.location.search);
    this.cookies = new Cookies();
  }

  getData = (query) => {
    const params = new URLSearchParams(query);
    let uid = params.get("uid")
    let circle = params.get("circle")
    database.getConnection(uid, circle, (data) =>{
      let connections = {}
      if(this.cookies.get('connections')){
        connections = this.cookies.get('connections');
      }
      let combine_data = {}
      combine_data[uid] = data
      connections = Object.assign({}, connections, combine_data)
      this.cookies.set('connections', connections, { path: '/' });
      this.setState({data:data, uid:uid, circle:circle})
    })
  }

  render() {
    let rows = [];
    if(this.state.data){
      Object.keys(this.state.data).forEach(key => {
        rows.push(
          <div key={key} className="item">
            <h4 style={{marginTop:0}}>{key}</h4>
            {this.state.data[key][0] &&
              <p>Link to <a href={this.state.data[key][0]} target="_blank">{key}</a></p>
            }
            {this.state.data[key][1] &&
              <p>{this.state.data[key][1]}</p>
            }
          </div>
        )
      });
    }
    return (
			<div className="Connect Login" style={{padding:0}}>
        <div style={{padding:"25px"}}>
          <div>Contact information for</div>
          <h1 style={{margin:"0px"}}>{this.state.uid}</h1>
        </div>
        <div style={{marginLeft:"10px",marginRight:"10px"}}>
          {rows}
        </div>
        <div style={{marginLeft:"10px",marginRight:"10px"}}>
          <Link to="/" className="login-button waves-effect waves-light btn">Home</Link>
          <Link to="/connections" className="login-button waves-effect waves-light btn">See All Connections</Link>
        </div>
			</div>
    );
  }
}

export default Connect;