import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { domainToUnicode } from 'url';
import database from "../utils/utils.js"
export default class Signup extends Component {
	constructor(props){
		super(props)
		this.state = {pageNo:1, firstName:"", lastName:"", userAccounts:undefined, selectedAccounts:[]}
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
		Object.keys(data).forEach( account => {

			data[account].splice(1,0,"")
			
		})

		console.log(data)
		this.setState({userAccounts:data})	
	}
	contains = (a, obj) => {
    var i = a.length;
    while (i--) {
       if (JSON.stringify(a[i]) == JSON.stringify(obj)) {
           return true;
       }
    }
    return false;
	}
	toggleCard = (e, account) => {

		console.log(this.contains(this.state.selectedAccounts, account))

		if(!this.contains(this.state.selectedAccounts, account)){
			
			this.setState({selectedAccounts:this.state.selectedAccounts.concat(account)})
			e.target.style.backgroundColor = "rgba(0,0,0,0.4)"
		
		}
		else{

			let array = this.state.selectedAccounts

			array.splice(array.indexOf(account), 1)

			console.log('hey wtf')

			console.log(array)

			this.setState({selectedAccounts:array})

			e.target.style.backgroundColor = "rgba(0,0,0,0)"

		}
		console.log(this.state.selectedAccounts)

	
		
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
	addAccount = () => {

		let name = document.getElementById('account-type').value
		let url = document.getElementById('account-url').value 
		let comment = document.getElementById('account-comment').value 

		let account = {}
		account[name] = [url, "", comment]

		this.setState({selectedAccounts:this.state.selectedAccounts.concat(account)})

		document.getElementById('account-type').value = ""
		document.getElementById('account-url').value = ""
		document.getElementById('account-comment').value = ""

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
	
					// 			this.listData(data)
							
					// 	})
					// })

					
				}
					
				let accounts = [];

				if(this.state.userAccounts){
					Object.keys(this.state.userAccounts).forEach(account => {
					
					let accountName = this.state.userAccounts[account][0]
					

					if(accountName != null){
						let accountName1 = accountName.substring(accountName.lastIndexOf('/')  + 1)
						if (accountName1.lastIndexOf('?') != -1){

							accountName1 = accountName1.substring(0, accountName1.lastIndexOf('?'))
							
						}
						if(this.state.userAccounts[account][2] == null){

							this.state.userAccounts[account][2] = "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png"

						}
						let asdf = {}
						asdf[account] = this.state.userAccounts[account]
						accounts.push(
							<div key={account} onClick={(e) => {this.toggleCard(e, asdf)}} className="accountCard">
								<img onClick={() => {this.gotoPage(accountName)}} className="accountCardImage" src={this.state.userAccounts[account][2]}></img>
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
						<h3 id="name">3 | Other Accounts</h3>
						<h4 id="subtext">Add Accounts</h4>
						<input id="account-type" className="login-field" type="text" placeholder="Account Type (i.e. Facebook, Instagram)"></input>
						<input id="account-url" className="login-field" type="text" placeholder="Url"></input>
						<input id="account-comment" className="login-field" type="text" placeholder="Comment"></input>

						<button onClick={this.addAccount} className="login-button waves-effect waves-light btn">Add</button>
						<a onClick={this.nextPage} className="login-button waves-effect waves-light btn">Next</a>
					</div>
				)

				case 4:
					let userAccounts = {}
					this.state.selectedAccounts.forEach((data) => {
						let key = Object.keys(data)[0]
						userAccounts[key] = data[key]
					})
					return (
						<Circles accounts={userAccounts} firstName={this.state.firstName} lastName={this.state.lastName}/>
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

	finished = () => {
		let uid = this.props.firstName + " " + this.props.lastName
		let circles = {}
		Object.keys(this.state.circles).forEach((circle) => {
			let temp = {}
			this.state.circles[circle].forEach(account => {
				let newList = []
				this.props.accounts[account].forEach(data=>{
					if(data){
						newList.push(data)
					}
				})
				if(newList.length !== 0){
					temp[account] = this.props.accounts[account]
				}
			})
			circles[circle] = temp
		})
		database.addUser(uid,circles)
		setTimeout(() => {window.location.href = "/home"}, 500);
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
		Object.keys(this.props.accounts).forEach((account) =>{
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
				<a onClick={() => {this.finished()}} className="login-button waves-effect waves-light btn">Done</a>
			</div>
		)
	}		
}