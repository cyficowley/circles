import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';

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
      let localData = this.state.data;
      let comment = localData["comment"];
      delete localData.comment
      Object.keys(localData).forEach(uid => {
        let innerRows = [];
        Object.keys(this.state.data[uid]).forEach(key => {
          innerRows.push(<div key={key}>{key} : {this.state.data[uid][key]}</div>)
        });
        rows.push(<div key={uid}>{uid} comment: {comment} info: <div>{innerRows}</div></div>)
      });
    }
    return (
			<div className="Connections">
        data:
        <div>
          {rows}
        </div>
			</div>
    );
  }
}

export default Connections;