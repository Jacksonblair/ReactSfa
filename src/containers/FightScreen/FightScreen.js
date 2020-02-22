import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components
import Username from '../../components/Username/Username';
import CharacterName from '../../components/CharacterName/CharacterName';
import Timer from '../../components/Timer/Timer';
import HpBars from '../../components/HpBars/HpBars';
import Avatars from '../../components/Avatars/Avatars';
import ActionButtons from '../../components/UI/ActionButtons/ActionButtons';
import FightResolution from '../FightResolution/FightResolution';

// styles
import classes from './FightScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class FightScreen extends Component {

	state = {
		// local UI state
		showingFight: false,
		canShowFight: false
	}

	actionClickedHandler = (action) => {
		// @AXIOS - Replace with axios PUT(GET?) request later
		log('[FightScreen] action clicked ' + action)
	}

	canShowFight = () => {
		// Checks if players have both acted && a fight is not previously allowed to be shown
		// Then allows fight to be shown...
		// Fights will also be allowed to shown when the 'round' has changed
		// But only if they started before the round has changed
		if (this.props.playerOneActions[this.props.round - 1] && this.props.playerTwoActions[this.props.round - 1] && !this.state.canShowFight) {
			this.setState({canShowFight: true})
			this.setState({showingFight: true})
			log('[FightScreen] display fight');

			// Sets Timeout to set condition for displaying <FightResolution> component
			// Using state.showFighting so it can remain irrespective
			// of a state change, which allows it to play for users
			// who open the app at weird times.
			// ..
			// Can also use this to trigger visual changes for healthbars/avatars

			setTimeout(() => {
				log('[FightScreen] remove fight')
				this.setState({showingFight: false})
			}, 2000)
		}
	}

	componentDidMount = () => {
		// Check if you can show fight
		// (For users who open app halfway through)
		this.canShowFight()
	}

	componentDidUpdate = (prevProps) => {
		// Checks if new round has started
		if (prevProps.round !== this.props.round) {
			this.setState({canShowFight: false})
			log('[FightScreen] New round');			
		}

		// Check if you can show fight
		this.canShowFight();
	}

	render() {

		// Shows fight if time to show fight
		let fightResolution = null;
		if (this.state.showingFight) {
			fightResolution = (
				<FightResolution 
					p1Action={this.props.playerOneActions[this.props.round - 1]}
					p2Action={this.props.playerTwoActions[this.props.round - 1]}
					round={this.props.round}
				/>
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
				<Avatars />
				<ActionButtons clicked={(action) => this.actionClickedHandler(action)}/>
				{fightResolution}
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
        round: state.round
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FightScreen);