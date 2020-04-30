import React, { Component } from 'react';
import { connect } from 'react-redux';

// styles
import classes from './NextScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class NextScreen extends Component {

	state = {
		// local UI state
	}

	render() {

		let topPlayernameClass = `${classes.player} + ${classes.top}`
		let bottomPlayernameClass = `${classes.player} + ${classes.bottom}`

		return (
			<div className={this.props.class}> 
				<div className={classes.background}/>
				<div className={topPlayernameClass}> {this.props.playerOneUsername} </div>
				<div className={bottomPlayernameClass}> {this.props.playerTwoUsername} </div>
				<img className={classes.vsElement} src={require("../../assets/images/upnextVsElement.png")}/>
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

export default connect(mapStateToProps)(NextScreen);