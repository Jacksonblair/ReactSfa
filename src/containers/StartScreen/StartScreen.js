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
		return (
			<div className={this.props.class}> 
				<div className={classes.background}/>	
				<Logo />
				<Username screen="START" username={this.props.playerOneUsername} left />
				<Username screen="START" username={this.props.playerTwoUsername} />
				<button className={classes.playButton} onClick={this.props.clicked}> PRESS PLAY </button>
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