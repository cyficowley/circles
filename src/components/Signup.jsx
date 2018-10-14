import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { domainToUnicode } from 'url';
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


