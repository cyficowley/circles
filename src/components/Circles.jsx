import React, { Component } from 'react';
import database from "../utils/utils"
import { Object } from 'core-js';
import {Link} from 'react-router-dom'
import wci from './whitecircle.jpg'
import { runInThisContext } from 'vm';
import '../css/main.css'

class Circles extends Component {
  constructor(props){
    super(props);
    this.state = {data:undefined, circles:undefined}
    this.name = "";
  }

  generateLink = (circle) => {
    return "http://localhost:3000/connect?uid=" + this.props.uid + "&circle=" + circle
  }

  getCircles() {
    database.getPersonalData(this.props.uid, (data)=>{
      this.setState({data:data})
      var myCircles = this.state.data.circles;
      this.setState({circles:myCircles});
    })
  }

  componentDidMount() {
    this.getCircles();
  }

  render() {
    let circleNames = [];
    let linkedAccounts = {};
    let displayRows = [];
    if(this.state.circles){
     Object.keys(this.state.circles).forEach((circleName)=>{
         circleNames.push(circleName);
     })
    }
    if (circleNames.length > 0) {
        circleNames.forEach((circleName)=>{
            let allAccounts = []
            Object.keys(this.state.circles[circleName]).forEach((key)=>{
                linkedAccounts[circleName] = key;
                allAccounts.push(key);
            })
            displayRows.push({name:circleName, accounts:allAccounts});
        })
    }

    return (
		<div className="Connect Login" style={{padding:0}}>
        <h3 id="subtext" className="circles-home-name">{this.props.uid.replace(/\b\w/g, l => l.toUpperCase()) + "'s Circles"}</h3>
        <div className="grid-container">
            {
                displayRows.map(circle => {
                    return (
                        <div className="circle-item">{circle.name}</div>
                    )
                })
            }
        </div>
			</div>
    );
  }
}

export default Circles;