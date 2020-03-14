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

		/*https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a*/
		let arrayOfTen = [...Array(10)].map((_, i) => i);

		let ranks = arrayOfTen.map((el) => {
			return <React.Fragment><p> {el} </p></React.Fragment>
		})

		let scores = arrayOfTen.map((el, index) => {
			return <React.Fragment><p> { this.props.scores[index] ? this.props.scores[index].score : '00000000' } </p></React.Fragment>
		})

		let names = arrayOfTen.map((el, index) => {
			return <React.Fragment><p> { this.props.scores[index] ? this.props.scores[index].display_name : 'NONE' } </p></React.Fragment>
		})

		return (
			<div className={this.props.class}> 
				<div className={classes.HighScores}>
					<h1 className={classes.scoreHeader}> HIGHSCORES </h1>
					<div className={`${classes.column} + ${classes.rankColumn}`}> 
						{ranks}
					</div>
					<div className={`${classes.column} + ${classes.nameColumn}`}> 
						{names}
					</div>
					<div className={`${classes.column} + ${classes.scoreColumn}`}> 
						{scores}
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