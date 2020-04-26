import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from 'axios';

// components
import UsernameBar from '../../components/UsernameBar/UsernameBar';
import CharacterName from '../../components/CharacterName/CharacterName';
import Timer from '../../components/Timer/Timer';
import HpBars from '../../components/HpBars/HpBars';
import Avatars from '../../components/Avatars/Avatars';
import ActionButtons from '../../components/UI/ActionButtons/ActionButtons';
import FightResolution from '../../components/FightResolution/FightResolution';
import Message from '../../components/Message/Message';

// styles
import classes from './FightScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class FightScreen extends Component {

	state = {
		// local UI state
		avatarsShown: false,
		fightMessageShown: false,
		screenReady: false,
		fightBeingShown: false,
		fightCanBeShown: true,
		lastAction: null
	}

	userIsPlayer() {
		return this.props.appUserId === this.props.playerOneId || this.props.appUserId === this.props.playerTwoId
	}

	actionClickedHandler = (action) => {
		// Store users selection locally
		this.setState({lastAction: action});

		// Send ajax request to server
		axios.post('/action', {
			action: action
		})
		.then((res) => {
			log(res);
		}).catch((err) => {
			log(err);
		})
	}

	// if player loads

	// Show initial animations (fight message, avatar slide in, etc)
	// then..

	// Show a fight if there are two actions for the current round
	// .. And a fight has not already been shwon

	// If the round changes right after a user loads app
	// .. App should give x seconds before it allows any more fights to be shwon
	// .. To allow previous fight to resolve visually

	// variables:
	// screenReady
	//
	// 2 x actions, round, fightIsBeingShown
	//
	// reference fightIsBeingShown ^ 

	shouldShowFight = () => {
		// If screen not ready, exit function.
		if (!this.state.screenReady) {
			return;
		// Else if both players have acted for current round..
		// ..and a fight is not already being shown
		} else if (this.props.playerOneActions[this.props.round - 1] 
		&& this.props.playerTwoActions[this.props.round - 1] 
		&& !this.state.fightBeingShown
		&& this.state.fightCanBeShown) {
			log('[FightScreen] Showing fight for round: ' + this.props.round);
			
			// Tell app fight is being shown..
			// .. and that a fight can't be shown until this one is over..
			this.setState({fightBeingShown: true, fightCanBeShown: false})
			log('[FightScreen] Fight being shown!')

			// After x seconds, let app know fight is finished ..
			// .. and is no longer being shown ..
			setTimeout(() => {
				log('[FightScreen] Fight stopped being shown!')
				this.setState({fightBeingShown: false, lastAction: null}); // set last action back to default
			}, 4000)
		}
	}

	componentDidMount = () => {
		// After three seconds, screen can update.
		setTimeout(() => {
			this.setState({screenReady: true})
		}, 3000)

		// Stops avatar mount animation from playing twice
		setTimeout(() => {
			this.setState({avatarsShown: true})
		}, 1500);

		// Lets 'FIGHT!' message show briefly on load
		setTimeout(() => {
			this.setState({fightMessageShown: true})
		}, 3000)

		// Check if a round sequence can be shown
		this.shouldShowFight()
	}

	componentDidUpdate = (prevProps) => {
		// If a new round has been started..
		// ..And a fight is not being currently shown..
		// ..Allow app to show another fight..
		if (prevProps.round !== this.props.round) {
			log('[FightScreen] There is a new round');
			if (!this.state.fightBeingShown) {
				this.setState({fightCanBeShown: true})				
			} else {
				log('[FightScreen] Waiting to show next round')
				let checkInt = setInterval(() => {
					log('[FightScreen] Waiting...');
					if (!this.state.fightBeingShown) {
						this.setState({fightCanBeShown: true})
						log('[FightScreen] Showing next round')
						clearInterval(checkInt);
					}
				}, 500)
			}
		}

		// Check if a round sequence can be shown
		this.shouldShowFight()
	}

	render() {

		// Allow fight message to show for x seconds
		let fightMessage = null;
		if (!this.state.fightMessageShown && !this.props.overallWinner) {
			let theMessage = `FIGHT!`
			fightMessage = (
				<Message type="FIGHT">
					{theMessage}
				</Message>
			)
		}

		// Shows fight resolution if fight underway
		let fightResolution = null;
		if (this.state.fightBeingShown) {
			fightResolution = (
				<FightResolution 
					p1Action={this.props.playerOneActions[this.props.round - 1]}
					p2Action={this.props.playerTwoActions[this.props.round - 1]}
					round={this.props.round}
					winner={this.props.winner[this.props.round - 1]}
				/>
			)
		}

/*		hide action bar if there is a fight underway..
		..or if there is an overall winner (match is over) ..
		..or if screen is not ready..
		..or if the user is not a player..
*/		let actionButtons = null;
		if (this.userIsPlayer() && !this.state.fightBeingShown && !this.props.overallWinner && this.state.screenReady) {
			actionButtons = (
				<ActionButtons lastAction={this.state.lastAction} clicked={(action) => this.actionClickedHandler(action)}/>
			)
		}

		// If there is an overall winner, show winner message
		let winnerMessage = null;
		if (this.props.overallWinner) {
			let theMessage = `${this.props.overallWinner === 1 ? this.props.playerOneUsername : this.props.playerTwoUsername } wins!`
			winnerMessage = (
				<Message type="WINNER">
					{theMessage.toUpperCase()}
				</Message>
			)
		}

		let turboBackground = (this.props.playerOneTurboHp || this.props.playerTwoTurboHp) ?
			classes.turboBackground : classes.none;

		return (
			<div className={this.props.class}> 
				<div className={classes.background}/>
				<div className={turboBackground}/>
				<UsernameBar playerOneUsername={this.props.playerOneUsername} playerTwoUsername={this.props.playerTwoUsername}/>
				<HpBars left hp={this.props.playerOneHp} turboHp={this.props.playerOneTurboHp}/>
				<HpBars hp={this.props.playerTwoHp} turboHp={this.props.playerTwoTurboHp}/>
				<Timer screen="FIGHT" timer={this.props.timer}/>
				<Avatars 
					winner={this.props.winner[this.props.round - 1]} 
					overallWinner={this.props.overallWinner}
					characterOne={this.props.characterOne}
					characterTwo={this.props.characterTwo}
					mounted={this.state.avatarsShown}
					// This prop controls class assignment
					fightBeingShown={this.state.fightBeingShown}
					round={this.props.round}
					roster={this.props.roster}
				/>
				{actionButtons}
				{fightResolution}
				{winnerMessage}
				{fightMessage}
			</div>
		)
	}
	
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
        playerOneUsername: state.playerOneUsername,
        playerTwoUsername: state.playerTwoUsername,
        playerOneHp: state.playerOneHp,
        playerTwoHp: state.playerTwoHp,
        playerOneActions: state.playerOneActions,
        playerTwoActions: state.playerTwoActions,
        timer: state.timer,
        characterOne: state.characterOne,
        characterTwo: state.characterTwo,
        round: state.round,
        winner: state.winner,
        overallWinner: state.overallWinner,
        playerOneId: state.playerOneId,
        playerTwoId: state.playerTwoId,
        appUserId: state.appUserId,
        playerOneTurboHp: state.playerOneTurboHp,
        playerTwoTurboHp: state.playerTwoTurboHp,
        roster: state.roster
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);