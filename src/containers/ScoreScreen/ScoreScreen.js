import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// styles
import classes from './ScoreScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class ScoreScreen extends PureComponent {

	state = {
		// local UI state
	}

	render() {
		/*https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a*/
		let arrayOfTen = [...Array(9)].map((_, i) => i);

		let ranks = arrayOfTen.map((el, index) => {
			return <p key={index}> {`${el + 1}.`} </p>
		})

		let scores = arrayOfTen.map((el, index) => {
			return <p key={index}> { this.props.scores[index] ? this.props.scores[index].score : '0000' } </p>
		})

		let names = arrayOfTen.map((el, index) => {
			return <p key={index}> { this.props.scores[index] ? this.props.scores[index].display_name : '**EMPTY**' } </p>
		})

		return (
			<div className={this.props.class}> 
				<div className={classes.HighScores}>
					<React.Fragment>
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
					</React.Fragment>
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