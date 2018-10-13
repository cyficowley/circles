import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';

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
      this.setState({data:data})
    })
  }

  render() {
    let rows = [];
    if(this.state.data){
      Object.keys(this.state.data).forEach(key => {
        rows.push(<div key={key}>{key} : {this.state.data[key]}</div>)
      });
    }
    return (
			<div className="Connect">
        data:
        <div>
          {rows}
        </div>
			</div>
    );
  }
}

export default Connect;