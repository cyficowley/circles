import React, { Component } from 'react';
import database from "../utils/utils"
import Cookies from 'universal-cookie';
import { Object } from 'core-js';
import {Link} from 'react-router-dom'
import wci from './whitecircle.jpg'
import { runInThisContext } from 'vm';

class Circles extends Component {
  constructor(props){
    super(props);
    this.state = {data:undefined, circles:undefined}
    this.cookies = new Cookies();
    this.name = "";

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

  getCircles() {
    database.getPersonalData(this.props.uid, (data)=>{
      this.setState({data:data})
      console.log("Monster cack");
      var myCircles = this.state.data.circles;
      console.log("FUCK ME")
      console.log(myCircles);
      this.setState({circles:myCircles});
      //console.log(myCircles);
    })
  }

  getName() {
    database.getPersonalData(this.props.uid, (data)=>{
      this.setState({data:data})
      console.log(this.props.uid);
    })
  }

  componentDidMount() {
    this.getCircles();
    this.getName();
  }

  render() {
    let items = [];
    let ma = [];
    if(this.state.circles){
      const x = Object.keys(this.state.circles);
      x.forEach((k)=>{
        items.push(<li className="circle-link">{k}</li>)
      })
    }

    return (
			<div className="Connect Login" style={{padding:0}}>
        <h3 className="circles-home-name">{this.props.uid + "'s Circles:"}</h3>
        <ul>
          {items}
        </ul>
			</div>
    );
  }
}



/*


  render() {
    let rows = [];
    if(this.state.data){
      Object.keys(this.state.data).forEach((person, index)=>{
        let image = undefined;
        Object.keys(this.state.data[person]).forEach(key => {
          if(this.state.data[person][key][2] && !image && key !== "comment"){
            image = this.state.data[person][key][2];
          }
        })

        rows.push(<div className="YEET" key={this.state.data[person]["comment"]}>
          <h3 style={{marginTop:0}}>{person}</h3>
          <div className="row" style={{display:"flex",alignItems:"center"}}>
            {image && 
            <img style={{borderRadius:"50%", width:"30%", float:"left", paddingRight:"10px"}} src={image}/>
            }
            {this.state.data[person]["comment"] &&
            <p style={{paddingLeft:"10px"}}>{this.state.data[person]["comment"]}</p>}
          </div>
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

*/

export default Circles;