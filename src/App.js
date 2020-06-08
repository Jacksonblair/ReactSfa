import React, { Component } from 'react'
import Authentication from './util/Authentication/Authentication'
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';
import axios from 'axios';
import classes from './App.css'

import View from './containers/View/View.js'

const log = window.Twitch ? msg => window.Twitch.ext.rig.log(msg) : null;

class App extends Component {
	Authentication = new Authentication()
	//if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
	twitch = window.Twitch ? window.Twitch.ext : null

	state = { 
		// put some state in here
		connectionTimedOut: false,
		connectionTimeout: null
	}

	componentDidMount = () => {
		if(this.twitch){
			this.twitch.onAuthorized((auth)=>{
				this.Authentication.setToken(auth.token, auth.userId)
				// log(this.Authentication)
				if(!this.state.finishedLoading){
					// Set default axios header
					axios.defaults.headers.post['Authorization'] = 'Bearer ' + auth.token;
					axios.defaults.headers.post['opaque_id'] = auth.userId;
					// Send user id to central store
					this.props.onPlayerAuth(auth.userId);

					/* Get character roster from channel config
					Store roster in central store */
					let roster = this.twitch.configuration.broadcaster
					if (roster) {
						this.props.onRosterUpdate(JSON.parse(roster.content))
						console.log(roster.content)
					}
				}
			})


			// React to context changes
			this.twitch.onContext((context, arr) => {
				console.log(context)
				console.log(arr)
				/*if video resolution changes*/
				arr.forEach((val, i) => {
					switch(val) {
						case 'displayResolution':
							let res = context.displayResolution.split('x');
							this.props.onResolutionUpdate(res);
							break;
						default: return;
					}
				})
			})

			// $$DO I NEED THIS
			if (this.twitch.features.isBitsEnabled) {
				console.log('bits is enabled for this channel')
			} else {
				console.log('bits not enabled')
			}

			// $$DO I NEED THIS
			this.twitch.bits.onTransactionComplete((transaction) => {
				console.log(transaction);
			});

			// Listen to pubsub for gamestate packets
			this.twitch.listen('broadcast',(target, contentType, body) => {
				let state = JSON.parse(body);
				this.props.onGameStateUpdate(state);

				// Manages timeout if the server stops sending packets through pub sub.
				// Every time we update from pub sub, we check if we have timed out
				// - If we have timedOut, we set it to false.
				// 
				// Additionally, when we get a packet...
				// We set a 10 second timer
				// If we get to 10 seconds without a packet, we set timedOut to true.
				// This timer gets cleared and reset each time we receive a packet

				if (this.state.connectionTimedOut) {
					this.setState({connectionTimedOut: false})
					this.props.onTimeoutUpdate(false); // update store so <View> knows
				}

				clearTimeout(this.state.connectionTimeout);
				let timeout = 60 * 1000;

				this.state.connectionTimeout = setTimeout(() => {
					console.log(`[App] Have not received a packet for ${timeout/60} seconds`)
					this.setState({connectionTimedOut: true});
					this.props.onTimeoutUpdate(true); // update store so <View> knows
				}, timeout)
			})

			this.twitch.onError((err) => {
				log(err);
			})

			// get roster from server
			axios.get('/roster')
			.then((res) => {
				this.props.onRosterUpdate(JSON.parse(res.data))
			})
		}
	}

	componentWillUnmount = () => {
		if(this.twitch){
			this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
		}
	}

	render(){

		let view = null;
		// Only render screen if the resolution is above 600x400 pixels
		if (this.props.resolution[0] >= 600 && this.props.resolution[1] >= 400) {
			view = <View />
		}

		return (
			<div className={classes.App}>
				{view}
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
		resolution: state.resolution
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPlayerAuth: (id) => dispatch({type: actionTypes.PLAYER_AUTH, payload: { id: id }}),
		onGameStateUpdate: (gamestate) => dispatch({type: actionTypes.GAME_STATE_UPDATE, payload: { gamestate: gamestate }}),
		onRosterUpdate: (roster) => dispatch({type: actionTypes.ROSTER_UPDATE, payload: { roster: roster }}),
		onResolutionUpdate: (res) => dispatch({type: actionTypes.RESOLUTION_UPDATE, payload: { resolution: res }}),
		onTimeoutUpdate: (timedOut) => dispatch({type: actionTypes.TIMEOUT_UPDATE, payload: { timedOut: timedOut }})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);