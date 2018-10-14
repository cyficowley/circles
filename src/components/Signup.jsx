import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Signup extends Component {
	constructor(props){
		super(props)
		this.state = {pageNo:1, firstName:"", lastName:"", userAccounts:undefined}
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
		this.setState({userAccounts:data})	
	}
	toggleCard = (e, account) => {

		console.log(e)
		console.log(account)
		
	}

	gotoPage = (link) => {
		window.open(link, '_blank');
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
					
				if(!this.state.userAccounts){
					let fake = {"Facebook":["https://www.facebook.com/ian.carrasco.92", "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p320x320/38924326_10209758689724385_5704585307827994624_n.jpg?_nc_cat=101&oh=07e5fd0772dc9c567a0bab0b7c5f1b1f&oe=5C5DFF66"],
							"Twitter" : ["https://twitter.com/ia_n_ai", "https://pbs.twimg.com/profile_images/1028139770474647552/ZtVPRnhO_400x400.jpg"], 
							"Github" : ["https://github.com/IanCarrasco", undefined], 
							"Linkedin" : [undefined, undefined]
					}
					setTimeout(() => {this.listData(fake)}, 500);
					// fetch("http://localhost:5000/scraper/" + encodeURI(this.state.firstName + " " + this.state.lastName)).then((result) => {
					// 	result.json().then((data) => {
	
					// 		if(this.state.userAccounts.length === 0){
					// 			this.listData(data)
					// 		}
					// 	})
					// })

					
				}
					
				let accounts = [];

				if(this.state.userAccounts){
					Object.keys(this.state.userAccounts).forEach(account => {
						console.log(this.state.userAccounts[account])
					let accountName = this.state.userAccounts[account][0]
					

					if(accountName != null){
						let accountName1 = accountName.substring(accountName.lastIndexOf('/')  + 1)
						if (accountName1.lastIndexOf('?') != -1){

							accountName1 = accountName1.substring(0, accountName1.lastIndexOf('?'))
							
						}
						if(this.state.userAccounts[account][1] == null){

							this.state.userAccounts[account][1] = "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png"

						}
					
						accounts.push(
							<div key={account} onClick={this.toggleCard(account)} className="accountCard">
								<img onClick={() => {this.gotoPage(accountName)}} className="accountCardImage" src={this.state.userAccounts[account][1]}></img>
								<h3>{account}<br/><h5>{accountName1}</h5></h3>
							</div>
						)
					}})}

				return (
					<div className="Login">
						<h4 id="subtext">2 | Social Accounts</h4>
						<h4 id="subtext">Suggested</h4>
						{accounts}
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
							<a onClick={this.nextPage} className="login-button waves-effect waves-light btn">Next</a>
						</div>
					)
				case 4:
					return (
						<Circles accounts={this.state.userAccounts}/>
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


class Circles extends Component {
	constructor(props){
		super(props)
		this.state = {
			circles:{},
			accounts:props.accounts,
			selected:""
		}
	}

	updateCircleSelection = (account) => {
		let circles = Object.assign({}, this.state.circles)
		let selected = this.state.selected;
		if(circles && selected){
			if(circles[selected] && circles[selected].includes(account)){
				let index = circles[selected].indexOf(account)
				circles[selected].splice(index,1)
			}
			else{
				circles[selected].push(account)
			}
			this.setState({circles:circles})
		}
	}

	changeCircle = (circle) => {
		this.setState({selected:circle})
	}

	addCircle = () => {
		let circles = Object.assign({}, this.state.circles)
		circles[document.getElementById('add_circle').value] = []
		this.setState({circles:circles})
	}

	render = () => {
		let circles = []

		Object.keys(this.state.circles).forEach((circle) =>{
			if(circle == this.state.selected){
				circles.push(<div key={circle} onClick={() => {this.changeCircle(circle)}} className="circle chosen" style={{backgroundColor:"rgba(255,255,255,0.3)", borderRadius:"10px"}}>
					<p style={{paddingLeft:"10px"}}>{circle}</p>
				</div>)
			}
			else{
				circles.push(<div key={circle} onClick={() => {this.changeCircle(circle)}} className="circle" style={{backgroundColor:"rgba(255,255,255,0.1)", borderRadius:"10px"}}>
					<p style={{paddingLeft:"10px"}}>{circle}</p>
				</div>)
			}
		})

		let accounts = []
		Object.keys(this.state.accounts).forEach((account) =>{
			if(this.state.circles[this.state.selected] && this.state.circles[this.state.selected].includes(account)){
				accounts.push(<div key={account} onClick={()=>{this.updateCircleSelection(account)}} className="account chosen" style={{backgroundColor:"rgba(255,255,255,0.3)", borderRadius:"10px"}}>
					<p style={{paddingLeft:"10px"}}>{account}</p>
				</div>)
			}
			else{
				accounts.push(<div key={account} onClick={()=>{this.updateCircleSelection(account)}} className="account" style={{backgroundColor:"rgba(255,255,255,0.1)", borderRadius:"10px"}}>
					<p style={{paddingLeft:"10px"}}>{account}</p>
				</div>)
			}
		})


		return(
			<div className="Connect Login">
				<h3>Circles</h3>
				<div>
					<input id="add_circle" placeholder="personal"></input>
					<button className="login-button waves-effect waves-light btn" onClick={() => {this.addCircle()}}>Add circle</button>
				</div>
				{circles}
				<h3 style={{color:"white"}}>Accounts</h3>
				{accounts}
				<a onClick={this.prevPage} className="login-button waves-effect waves-light btn">Back</a>
				<a onClick={() => {}} className="login-button waves-effect waves-light btn">Done</a>
			</div>
		)
	}		
}