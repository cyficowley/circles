import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Signup extends Component {
	constructor(props){

		super(props)
		this.state = {pageNo:parseInt(this.props.match.params.step)}
	}
	componentWillMount = () => {

		
	}
	componentWillReceiveProps = (props) =>{

		this.setState({pageNo: parseInt(props.match.params.step)})
	
	}
	renderStep = (page) => {
		switch(page){
			case 1:
				return (
					<div className="Login">
						<h4 id="subtext">1 | Name</h4>
						<input className="login-field" type="text" placeholder="First Name"></input>
						<input id="password" className="login-field" type="text" placeholder="Last Name"></input>
						<Link to="/signup/2" className="login-button waves-effect waves-light btn">Next</Link>
					</div>
				)
			case 2:
				return (
					<div className="Login">
						<h4 id="subtext">2 | Social Accounts</h4>
						<h4 id="subtext">Add Accounts</h4>
						<Link to="/signup/1" className="login-button waves-effect waves-light btn">Back</Link>
						<Link to="/signup/3" className="login-button waves-effect waves-light btn">Next</Link>
					</div>
				)
			case 3:
				return (
					<div className="Login">
						<h3 id="name">Welcome to Circles</h3>
						<h4 id="subtext">Add Accounts</h4>
						<Link to="/signup/1" className="login-button waves-effect waves-light btn">Back</Link>
						<Link to="/signup/3" className="login-button waves-effect waves-light btn">Next</Link>
					</div>
				)
		}
	}
	render = () => {

		return(
			<div>
				{this.renderStep(this.state.pageNo)}
			</div>	
		
		)
		
	}
}


