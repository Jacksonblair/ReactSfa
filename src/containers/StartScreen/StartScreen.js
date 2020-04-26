import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components
import Logo from '../../components/Logo/Logo';
import Username from '../../components/Username/Username';

// styles
import classes from './StartScreen.css';


const log = msg => window.Twitch.ext.rig.log(msg);

class StartScreen extends Component {

	state = {
		// local UI state
	}

	render() {
	
		let waitingHeader = null;
		// if only a single player, display message
		if ((this.props.playerOneUsername && !this.props.playerTwoUsername) || 
			(this.props.playerTwoUsername && !this.props.playerOneUsername)) {
			waitingHeader = ( 
				<p className={classes.waitingHeader}> 
					Waiting for second player
				</p>
			)
		}

		return (
			<div className={this.props.class}> 
				<div className={classes.background}/>	
				<Logo />
				<Username screen="START" username={this.props.playerOneUsername} left />
				<Username screen="START" username={this.props.playerTwoUsername} />
				{waitingHeader}
			</div>
		)
	}
	
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
        playerOneUsername: state.playerOneUsername,
        playerTwoUsername: state.playerTwoUsername
    };
}

export default connect(mapStateToProps)(StartScreen);