import React, {Component} from 'react';
import { connect } from 'react-redux';

// styles
import classes from './NextScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class NextScreen extends Component {

	state = {
		// local UI state
	}

	render() {

		let leftPlayerClass = `${classes.player} + ${classes.left}`
		let rightPlayerClass = `${classes.player} + ${classes.right}`

		return (
			<div className={this.props.class}> 
				<h1 className={classes.nextHeader}> UP NEXT </h1>
				<h1 className={leftPlayerClass}> {this.props.playerOneUsername} </h1>
				<h1 className={rightPlayerClass}> {this.props.playerTwoUsername} </h1>
				<h1 className={classes.vs}> VS </h1>
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