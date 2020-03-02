import React, { Component } from 'react'
import Authentication from './util/Authentication/Authentication'
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';

// screens
import StartScreen from './containers/StartScreen/StartScreen';
import SelectScreen from './containers/SelectScreen/SelectScreen';
import FightScreen from './containers/FightScreen/FightScreen';
import ScoreScreen from './containers/ScoreScreen/ScoreScreen';
import NextScreen from './containers/NextScreen/NextScreen';
import Console from './util/Console/Console';
import SneezeGuard from './components/SneezeGuard/SneezeGuard';
import axios from 'axios';

import classes from './App.css'
const log = window.Twitch ? msg => window.Twitch.ext.rig.log(msg) : null;


class App extends Component {

	Authentication = new Authentication()
	//if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
	twitch = window.Twitch ? window.Twitch.ext : null
	state={
			finishedLoading:false,
			currentScreen: null,
			screenClass: "screen fadeIn"
	}

	clickedPlayHandler = () => {
		axios.post('/play')
		.then((res) => {
			log(res);
		}).catch((err) => {
			log(err);
		})
	}

	componentDidMount = () => {
			if(this.twitch){
					this.twitch.onAuthorized((auth)=>{
							this.Authentication.setToken(auth.token, auth.userId)
							log(this.Authentication)
							if(!this.state.finishedLoading){
									// Set default axios header
									axios.defaults.headers.post['Authorization'] = 'Bearer ' + auth.token;
									axios.defaults.headers.post['user_opaque_id'] = auth.userId;
									// Send user id to central store
									this.props.onPlayerAuth(auth.userId);
									console.log(auth.userId);
									this.setState(()=>{
											return {finishedLoading:true}
									})
							}
					})

					this.twitch.listen('broadcast',(target, contentType, body) => {
						let state = JSON.parse(body);
						this.props.onGameStateUpdate(state);
						// log('got packet');
							// log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
					})
			}

			// set initial screen state
			this.setState({currentScreen: this.props.screen });
	}

	componentWillUnmount = () => {
			if(this.twitch){
					this.twitch.unlisten('broadcast', ()=>console.log('successfully unlistened'))
			}
	}

	componentDidUpdate = (prevProps) => {
			// console.log(this.props.playerOneActions)
			// console.log(this.props.playerTwoActions)
			// screen fade in/out functionality
			if (this.props.screen !== prevProps.screen) {
					this.setState({screenClass: "screen fadeOut"})
					setTimeout(() => {
							this.setState({currentScreen: this.props.screen, screenClass: "screen fadeIn"})
					}, 1000)
			}
	}

	userIsPlayer = () => {
		return this.props.appUserId === this.props.playerOneId || this.props.appUserId === this.props.playerTwoId
	}

	render(){

			// Check if to show sneezeGuard
			let sneezeGuard = null;
			// Check if user is either one of players
			// if (!this.userIsPlayer()) {
			// 	// Also check if "START" screen. If so, don't need to show, as there is a play button on the start screen.
			// 	if (this.state.currentScreen !== "START")
			// 		sneezeGuard = <SneezeGuard clicked={this.clickedPlayHandler} />
			// }

			// Set screen visibility depending on current state.
			let screen = null;
			switch(this.state.currentScreen) {
					case "START":
							screen = <StartScreen class={this.state.screenClass} clicked={this.clickedPlayHandler}/>                    
							break;
					case "SELECT":
							screen = <SelectScreen class={this.state.screenClass}/>
							break;
					case "FIGHT":
							screen = <FightScreen class={this.state.screenClass}/>
							break;
					case "SCORE":
							screen = <ScoreScreen class={this.state.screenClass}/>
							break;
					case "NEXT":
							screen = <NextScreen class={this.state.screenClass}/>
							break;
			}

			return (
					<div className={classes.App}>
						<div className={classes.view}>
							{screen}
							{sneezeGuard}
						</div>
						<Console />
					</div>
			)
	}
}

/*
		<p>Hello world!</p>
		<p>My token is: {this.Authentication.state.token}</p>
		<p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>
		<div>{this.Authentication.isModerator() ? <p>I am currently a mod, and here's a special mod button <input value='mod button' type='button'/></p>  : 'I am currently not a mod.'}</div>
		<p>I have {this.Authentication.hasSharedId() ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}` : 'not shared my ID'}.</p>
*/

const mapStateToProps = state => {
		return {
				screen: state.screen,
				appUserId: state.appUserId,
				playerOneId: state.playerOneId,
				playerTwoId: state.playerTwoId,
				// characters: state.characters,
				// characterOne: state.characterOne,
				// characterTwo: state.characterTwo,
				playerOneActions: state.playerOneActions,
				playerTwoActions: state.playerTwoActions,
		};
}

const mapDispatchToProps = dispatch => {
		return {
			onPlayerAuth: (id) => dispatch({type: actionTypes.PLAYER_AUTH, payload: { id: id }}),
    		onGameStateUpdate: (gameState) => dispatch({type: actionTypes.GAME_STATE_UPDATE, payload: { gameState: gameState }})
		};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);