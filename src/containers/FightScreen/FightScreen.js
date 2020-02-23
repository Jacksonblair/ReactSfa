import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components
import Username from '../../components/Username/Username';
import CharacterName from '../../components/CharacterName/CharacterName';
import Timer from '../../components/Timer/Timer';
import HpBars from '../../components/HpBars/HpBars';
import Avatar from '../../components/Avatar/Avatar';
import ActionButtons from '../../components/UI/ActionButtons/ActionButtons';
import FightResolution from '../../components/FightResolution/FightResolution';
import Message from '../../components/Message/Message';

// styles
import classes from './FightScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class FightScreen extends Component {

	state = {
		// local UI state
		fightUnderway: false,
		fightTriggered: false,
		avatarsShown: false,
		fightMessageShown: false
	}

	actionClickedHandler = (action) => {
		// @AXIOS - Replace with axios PUT(GET?) request later
		log('[FightScreen] action clicked ' + action)
	}

	shouldShowFight = () => {
		// If both players acted ... 
		if (this.props.playerOneActions[this.props.round - 1] && this.props.playerTwoActions[this.props.round - 1] && !this.state.fightTriggered) {
			log('[CanShowFight]');

			// Tell app to trigger fight, which stops this function from forevering
			// Also let app know that fight is underway
			this.setState({fightTriggered: true})
			this.setState({fightUnderway: true})
			log('[FightScreen] Fight triggered & fight underway')

			// After x seconds, let app know fight no longer underway
			setTimeout(() => {
				this.setState({fightUnderway: false});
				log('[FightScreen] Fight no longer underway')				
			}, 2000)
		}
	}

	componentDidMount = () => {
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
		// Checks if new round has started
		if (prevProps.round !== this.props.round) {
			// When round changes, allow App to check if fights can be resolved again..
			this.setState({fightTriggered: false})
		}

		// Check if a round sequence can be shown
		this.shouldShowFight()
	}

	render() {

		// Shows fight resolution if fight underway
		let fightResolution = null;
		if (this.state.fightUnderway) {
			fightResolution = (
				<FightResolution 
					p1Action={this.props.playerOneActions[this.props.round - 1]}
					p2Action={this.props.playerTwoActions[this.props.round - 1]}
					round={this.props.round}
					winner={this.props.winner[this.props.round - 1]}
				/>
			)
		}

		// If screen is mounted, show fight message
		let fightMessage = null;
		if (!this.state.fightMessageShown && !this.state.fightTriggered) {
			let theMessage = `FIGHT!`
			fightMessage = (
				<Message type="FIGHT">
					{theMessage}
				</Message>
			)
		}

		// If there is an overall winner, show winner message
		let winnerMessage = null;
		if (this.props.overallWinner) {
			let theMessage = `Player ${this.props.overallWinner} wins!`
			winnerMessage = (
				<Message type="WINNER">
					{theMessage}
				</Message>
			)
		}

		// hide action bar if there is a fight underway ...
		// ... or if there is an overall winner (match is over)
		let actionButtons = null;
		if (!this.state.fightUnderway && !this.props.overallWinner) {
			actionButtons = (
				<ActionButtons clicked={(action) => this.actionClickedHandler(action)}/>
			)
		}

		return (
			<div className={this.props.class}> 
				<Username left screen="FIGHT" username={this.props.playerOneUsername} /> 
				<Username screen="FIGHT" username={this.props.playerTwoUsername} /> 
				<HpBars left hp={this.props.playerOneHp}/>
				<HpBars hp={this.props.playerTwoHp}/>
				<CharacterName left character={this.props.characterOne}/>
				<CharacterName character={this.props.characterTwo}/>
				<Timer screen="FIGHT" timer={this.props.timer}/>
				<Avatar
					winner={this.props.winner[this.props.round - 1]} 
					overallWinner={this.props.overallWinner}
					player={1}
					shown={this.state.avatarsShown}
					fightTriggered={this.state.fightTriggered}
					character={this.props.characterOne}
				/>				
				<Avatar 
					winner={this.props.winner[this.props.round - 1]} 
					overallWinner={this.props.overallWinner}
					player={2}
					shown={this.state.avatarsShown}
					fightTriggered={this.state.fightTriggered}
					character={this.props.characterTwo}
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
        overallWinner: state.overallWinner
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);