import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Signup extends Component {
	constructor(props){
		super(props)
		this.state = {pageNo:1, firstName:"", lastName:"", profile:{}, userAccounts:[]}
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

		console.log(JSON.stringify(data))
		this.setState({userAccounts:data.data})
	
	}
	toggleCard = (e, account) => {

		console.log(e)
		console.log(account)
		
	}

	nextPage = () => {
		let pageNo = this.state.pageNo + 1;
		this.setState({pageNo:pageNo})
	}

	prevPage = () => {
		let pageNo = this.state.pageNo - 1;
		this.setState({pageNo:pageNo})
	}

	renderStep = (page) => {
		switch(page){
			case 1:
				return (
					<div className="Login">
						<h4 id="subtext">1 | Name</h4>
						<input className="login-field" onChange={this.firstNameChange} type="text" placeholder="First Name" value={this.state.firstName}></input>
						<input className="login-field" onChange={this.lastNameChange} type="text" placeholder="Last Name" value={this.state.lastName}></input>
						<a onClick={this.nextPage} className="login-button waves-effect waves-light btn">Next</a>
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
						{this.state.userAccounts && 
							this.state.userAccounts.map(account => {
							let objKey = Object.keys(account)[0]
							let accountName = account[objKey][0]
							

							console.log(account[objKey])
							if(accountName != null){
								let accountName1 = accountName.substring(accountName.lastIndexOf('/')  + 1)
								if (accountName1.lastIndexOf('?') != -1){

									accountName1 = accountName1.substring(0, accountName1.lastIndexOf('?'))
									
								}
								if(account[objKey][1] == null){

									account[objKey][1] = "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png"

								}
							
							return(
								<div onClick={this.toggleCard(account)} className="accountCard">
									<img onClick={this.gotoPage(accountName)} className="accountCardImage" src={account[objKey][1]}></img>
									<h3>{objKey}<br/><h5>{accountName1}</h5></h3>
								</div>
								)
							}
						})}
						<a onClick={() => {this.prevPage(); this.setState({userAccounts:undefined})}} className="login-button waves-effect waves-light btn">Back</a>
						<a onClick={this.nextPage} className="login-button waves-effect waves-light btn">Next</a>
					</div>
				)
			case 3:
				return (
					<div className="Login">
						<h3 id="name">3 | Other accounts</h3>
						<h4 id="subtext">Add Accounts</h4>
						<a onClick={this.prevPage} className="login-button waves-effect waves-light btn">Back</a>
						<a onClick={() => {}} className="login-button waves-effect waves-light btn">Done</a>
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


