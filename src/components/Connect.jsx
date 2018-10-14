import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';
import {Link} from 'react-router-dom'

class Connect extends Component {
  constructor(props){
    super(props);
    this.state = {data:undefined}
    this.getData(window.location.href);
    this.cookies = new Cookies();
  }

  getData = (query) => {
    console.log(query)
    const params = new URLSearchParams(query);
    console.log(params)
    let circle = params.get("circle")
    let uid = params.get("uid")
    console.log(uid)
    database.getConnection(uid, circle, (data) =>{
      console.log(uid)
      console.log(circle)
      console.log(data)
      if(!this.props.uid){
        let connections = {}
        if(this.cookies.get('connections')){
          connections = this.cookies.get('connections');
        }
        let combine_data = {}
        combine_data[uid] = data
        connections = Object.assign({}, connections, combine_data)
        this.cookies.set('connections', connections, { path: '/' });
      }
      else{
        database.addConnection(this.props.uid, uid, circle)
      }
      
      this.setState({data:data, uid:uid, circle:circle})
    })
  }

  render() {
    let rows = [];
    let image = undefined;
    if(this.state.data){
      Object.keys(this.state.data).forEach(key => {
        if(this.state.data[key][2] && !image && key !== "comment"){
          image = this.state.data[key][2];
        }
      })
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
          <div style={{overflow:"auto", display:"flex",alignItems:"center", width:"100%", justifyContent: "space-between"}}>
            <h3 style={{margin:"0px", float:"left"}}>{this.state.uid}</h3>
            {image && 
            <img style={{borderRadius:"50%", width:"30%", float:"right", paddingRight:"10px"}} src={image}/>
            }
          </div>
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