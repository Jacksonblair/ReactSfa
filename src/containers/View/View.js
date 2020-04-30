import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// screens
import StartScreen from '../StartScreen/StartScreen'
import SelectScreen from '../SelectScreen/SelectScreen'
import FightScreen from '../FightScreen/FightScreen'
import ScoreScreen from '../ScoreScreen/ScoreScreen'
import NextScreen from '../NextScreen/NextScreen'
import Console from '../../util/Console/Console'
import SneezeGuard from '../../components/SneezeGuard/SneezeGuard'

// config menu
import LocalConfig from '../../components/LocalConfig/LocalConfig'

// Buttons
import TurboButton from '../../components/UI/TurboButton/TurboButton'
import VisibilityButton from '../../components/UI/VisibilityButton/VisibilityButton'
import ConfigButton from '../../components/UI/ConfigButton/ConfigButton'

import ReconnectOverlay from '../../components/ReconnectOverlay/ReconnectOverlay'
import axios from 'axios';

import classes from './View.css'
const log = window.Twitch ? msg => window.Twitch.ext.rig.log(msg) : null;

class View extends PureComponent {
	//if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
	twitch = window.Twitch ? window.Twitch.ext : null

	state = {
			currentScreen: null,
			screenClass: "screen fadeIn",

			canPressPlay: true,
			canPressPlayTimeout: null,
			videoResolution: [''],

			viewHidden: false,
			showConfig: false,
			viewPosition: 0 /* 0 is top left, 1 is top right, 2 is bot left, 3 is bot right */
	}

	clickedPlayHandler = () => {
		// If user is allowed to press play 
		// Tell server to handle user
		if (this.state.canPressPlay) { 
			axios.post('/play')
			.then((res) => {
				log(res);
			}).catch((err) => {
				log(err);
			})
		}

		// Stop user from pressing play, and set timeout before they can do it again
		this.setState({ 
			canPressPlayTimeout: 
				setTimeout(() => {
					this.setState({canPressPlay: true})
				}, 5000), 
			canPressPlay: false
		})
	}

	clickedTurboHandler = (/*productSku*/) => {
		console.log('[App.clickedTurboHandler] Clicked')
		this.twitch.bits.useBits('TUR');
	}

	clickedVisibilityButtonHandler = () => {
		// hide config menu if minimizing the view
		if (!this.state.viewHidden) {
			this.setState({viewHidden: true, showConfig: false})
		} else { 
			this.setState({viewHidden: false})
		}
	}

	clickedConfigButtonHandler = () => {
		this.setState({showConfig: !this.state.showConfig})
	}

	clickedPositionButtonHandler = (index) => {
		this.setState({viewPosition: index})
	}

	componentDidMount = () => {
		// set initial screen state
		this.setState({currentScreen: this.props.screen });
	}

	componentWillUnmount = () => {
		if(this.twitch){
			this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
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
		return this.props.appUserId == this.props.playerOneId || this.props.appUserId == this.props.playerTwoId
	}

	render(){
		let view = null;
		let reconnectOverlay = null
		let sneezeGuard = null;
		let screen = null;
		let localConfigMenu = null;
		let turboButton = null;
		let configButton = null;
		let visibilityButton = null;
		let containerPosition = null; // style for positioning view in container


		// Configure view element positioning
		switch (this.state.viewPosition) {
			case 0: containerPosition = classes.topLeft; break;
			case 1: containerPosition = classes.topRight; break;
			case 2: containerPosition = classes.bottomLeft; break;
			case 3: containerPosition = classes.bottomRight; break;
		}

		// If timed out show reconnect overlay 
		// This is to trigger creation of a new gamestate for this channel, if the ebs crashes and loses temporary gamestates
		if (this.props.timedOut) {
			reconnectOverlay = <ReconnectOverlay clicked={this.clickedPlayHandler} />
		}

		/* Configure "sneezeguard" */
		// Check if user is either one of players, if not, show sneezeguard
		if (!this.userIsPlayer()) {
	    	sneezeGuard = <SneezeGuard canPressPlay={this.state.canPressPlay} clicked={this.clickedPlayHandler} queue={this.props.queue} appUserId={this.props.appUserId}/>
		}

		/* Configure Buttons */
		// check if can show Turbo button
		// if (!this.props.turboUsername && this.state.currentScreen === "FIGHT") {
		turboButton = <TurboButton clicked={this.clickedTurboHandler}/>
		// }
		visibilityButton = <VisibilityButton clicked={this.clickedVisibilityButtonHandler}/>
		configButton = <ConfigButton clicked={this.clickedConfigButtonHandler}/>

		/* Configure local config menu visibility (local config is independent of channel config) */ 
		if (this.state.showConfig) {
			localConfigMenu = <LocalConfig positionIndex={this.state.viewPosition} clicked={this.clickedPositionButtonHandler}/>
		}

		// Set screen visibility depending on current gamestate.
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

		// if 'window' is visible, show game view
		if (!this.state.viewHidden) { 
			view = (
				<React.Fragment>
				<div className={classes.view}>
					{screen}
					{sneezeGuard}
					{reconnectOverlay}
					{localConfigMenu}
				</div>
				<div className={classes.containerButtons}>
					{turboButton}
					{configButton}
					{visibilityButton}
				</div>
				</React.Fragment>
			)
		// else show the minimized view
		} else {
			view = (
				<div className={classes.minimizedView}>
					<button className={classes.minimizedViewButton} onClick={this.clickedVisibilityButtonHandler}>
						SHOW
					</button>
				</div>
			)
		}	

		return (
			<div className={`${classes.container} + ${containerPosition}`}> 
				{view}
				{/*<Console/>*/}
				{/*<p>{this.props.appUserId}</p>
				<p>{this.props.playerOneId}</p>
				<p>{this.props.playerTwoId}</p>*/}
			</div>
		)
	}
}

const mapStateToProps = state => {
		return {
				screen: state.screen,
				appUserId: state.appUserId,
				playerOneId: state.playerOneId,
				playerTwoId: state.playerTwoId,
				characters: state.characters,
				characterOne: state.characterOne,
				characterTwo: state.characterTwo,
				playerOneActions: state.playerOneActions,
				playerTwoActions: state.playerTwoActions,
				turboUsername: state.turboUsername,
				queue: state.queue,
				timedOut: state.timedOut,
				resolution: state.resolution
		};
}

export default connect(mapStateToProps)(View);