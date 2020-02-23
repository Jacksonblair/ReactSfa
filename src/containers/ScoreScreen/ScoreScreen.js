import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components


// styles
import classes from './ScoreScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class ScoreScreen extends Component {

	state = {
		// local UI state
	}

	render() {
		return (
			<div className={this.props.class}> 
				<div className={classes.HighScores}>
					<h1 className={classes.scoreHeader}> HIGHSCORES </h1>
					<div className={`${classes.column} + ${classes.rankColumn}`}> 
						<p> 1 </p>
						<p> 2 </p>
						<p> 3 </p>
						<p> 4 </p>
					</div>
					<div className={`${classes.column} + ${classes.nameColumn}`}> 
						<p> BigBallsJim </p>
						<p> sexyFacts4u </p>
						<p> Hagrid </p>
						<p> xXxSpehirothXXx </p>
					</div>
					<div className={`${classes.column} + ${classes.scoreColumn}`}> 
						<p> 9500 </p>
						<p> 8200 </p>
						<p> 4200 </p>
						<p> 1800 </p>
					</div>
				</div>
			</div>
		)
	}
	
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
       	highscores: state.highscores
    };
}

export default connect(mapStateToProps)(ScoreScreen);