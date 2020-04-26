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
		let arrayOfTen = [...Array(9)].map((_, i) => i);

		let ranks = arrayOfTen.map((el) => {
			return <React.Fragment><p> {`${el + 1}.`} </p></React.Fragment>
		})

		let scores = arrayOfTen.map((el, index) => {
			return <React.Fragment><p> { this.props.scores[index] ? this.props.scores[index].score : '0000' } </p></React.Fragment>
		})

		let names = arrayOfTen.map((el, index) => {
			return <React.Fragment><p> { this.props.scores[index] ? this.props.scores[index].display_name : '**EMPTY**' } </p></React.Fragment>
		})

		return (
			<div className={this.props.class}> 
				<div className={classes.HighScores}>
					<div className={classes.background}/>
					<div className={classes.darkener}/>
					<img className={classes.highscoresHeader} src={require("../../assets/images/highscoresHeader.png")}/>
					<div className={classes.grid}>
						<div className={`${classes.column} + ${classes.rankColumn}`}> 
							{ranks}
						</div>
						<div className={`${classes.column} + ${classes.scoreColumn}`}> 
							{scores}
						</div>
						<div className={`${classes.column} + ${classes.nameColumn}`}> 
							{names}
						</div>
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