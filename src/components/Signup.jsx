import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Signup extends Component {
	constructor(props){

		super(props)
		this.state = {pageNo:parseInt(this.props.match.params.step), firstName:"", lastName:"", profile:{}, userAccounts:[]}
	}
	componentWillMount = () => {

		
	}
	componentWillReceiveProps = (props) =>{

		this.setState({pageNo: parseInt(props.match.params.step), profile:props.location.state})
	
	}
	firstNameChange = (e) =>{

		this.setState({firstName:e.target.value})

	}
	lastNameChange = (e) =>{

		this.setState({lastName:e.target.value})

	}
	listData = (data) => {

		this.setState({userAccounts:data.data})
	
	}

	renderStep = (page) => {
		switch(page){
			case 1:
				return (
					<div className="Login">
						<h4 id="subtext">1 | Name</h4>
						<input className="login-field" onChange={this.firstNameChange} type="text" placeholder="First Name" value={this.state.firstName}></input>
						<input className="login-field" onChange={this.lastNameChange} type="text" placeholder="Last Name" value={this.state.lastName}></input>
						<Link to={{pathname:"/signup/2", state:this.state}} className="login-button waves-effect waves-light btn">Next</Link>
					</div>
				)
			case 2:

				fetch("http://localhost:5000/scraper/" + encodeURI(this.state.firstName + " " + this.state.lastName)).then((result) => {

					result.json().then((data) => {

						if(this.state.userAccounts.length === 0){

							this.listData(data)
						}
					})

				})

				return (
					<div className="Login">
						<h4 id="subtext">2 | Social Accounts</h4>
						<h4 id="subtext">Suggested</h4>
						{this.state.userAccounts.map(account => {
							return(
							<div className="accountCard">

								<img src={account[1]}></img>

							</div>
							)
						})}
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


