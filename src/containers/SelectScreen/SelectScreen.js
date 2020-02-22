import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components
import Username from '../../components/Username/Username';
import CharacterSelectButtons from '../../components/UI/CharacterSelectButtons/CharacterSelectButtons'
import ArrowButton from '../../components/UI/ArrowButton/ArrowButton';
import Timer from '../../components/Timer/Timer';

// styles
import classes from './SelectScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class SelectScreen extends Component {

	state = {
		// local UI state
		scroll: 0,
		characterCount: 5 
	}

	scroll(amnt) {
		this.setState({scroll: this.state.scroll + amnt})
	}

	leftArrowClickedHandler = () => {
		this.scroll(-25);
		log('[SelectScreen] left arrow clicked')
	}

	rightArrowClickedHandler = () => {
		this.scroll(25);
		log('[SelectScreen] right arrow clicked')
	}

	characterSelectedHandler = (charIndex) => {
		// @AXIOS - Replace with axios PUT(GET?) request later
		log('[SelectScreen] player selected character ' + charIndex);
	}

	render() {
		return (
			<div className={this.props.class}> 
				<h1 className={classes.selectHeader}> FIGHTER SELECT </h1>
				<h1 className={classes.vsHeader}> VS </h1>
				<Username screen="SELECT" username={this.props.playerOneUsername} left/>
				<Username screen="SELECT" username={this.props.playerTwoUsername}/>
				<CharacterSelectButtons scroll={this.state.scroll} selected={(index) => this.characterSelectedHandler(index)}/>
				<ArrowButton left clicked={this.leftArrowClickedHandler}/>
				<ArrowButton clicked={this.rightArrowClickedHandler}/>
				<p>{this.state.scroll}</p>
				<Timer screen="SELECT" left timer={this.props.timer}/>
				<Timer screen="SELECT" timer={this.props.timer}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
        playerOneUsername: state.playerOneUsername,
        playerTwoUsername: state.playerTwoUsername,
        timer: state.timer
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectScreen);