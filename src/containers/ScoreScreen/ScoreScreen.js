import React, {Component} from 'react';
import { connect } from 'react-redux';

// styles
import classes from './ScoreScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class ScoreScreen extends Component {

	state = {
		// local UI state
	}

	render() {

		let ranks = [10].map((el) => {
			return <p> {el} </p>
		})

		let scores = [10].map((el, index) => {
			return <p> { this.props.scores[index] ? this.props.scores[index].score : '00000000' } </p>
		})

		let names = [10].map((el, index) => {
			return <p> { this.props.scores[index] ? this.props.scores[index].display_name : 'NONE' } </p>
		})

		return (
			<div className={this.props.class}> 
				<div className={classes.HighScores}>
					<h1 className={classes.scoreHeader}> HIGHSCORES </h1>
					<div className={`${classes.column} + ${classes.rankColumn}`}> 
						{ranks}
					</div>
					<div className={`${classes.column} + ${classes.nameColumn}`}> 
						{scores}
					</div>
					<div className={`${classes.column} + ${classes.scoreColumn}`}> 
						{names}
					</div>
				</div>
			</div>
		)
	}
	
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
       	scores: state.scores
    };
}

export default connect(mapStateToProps)(ScoreScreen);