import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

// components
import Username from '../../components/Username/Username';
import CharacterName from '../../components/CharacterName/CharacterName';
import CharacterSelectButtons from '../../components/UI/CharacterSelectButtons/CharacterSelectButtons'
import SelectedCharacters from '../../components/SelectedCharacters/SelectedCharacters';
import ArrowButton from '../../components/UI/ArrowButton/ArrowButton';
import Timer from '../../components/Timer/Timer';

// styles
import classes from './SelectScreen.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class SelectScreen extends Component {

	state = {
		// local UI state
		// Scroll tracks state of scrollbar, and sets it to center..
		// ..of available characters on load
		scroll: (Math.floor(this.props.characters.length / 2) - 2) * -25,
		hoveredCharacterName: '',
		clickedCharacterName: ''
	}

	userIsPlayer = () => {
		return this.props.appUserId === this.props.playerOneId || this.props.appUserId === this.props.playerTwoId
	}

	characterSelectedHandler = (charIndex) => {
		// Make ui scroll to selected character..
		// ..and set character as 'last clicked'
		this.setState({scroll: (charIndex - 1) * -25, clickedCharacterName: this.props.characters[charIndex]})
		// @AXIOS - Replace with axios PUT(GET?) request later
		log('[SelectScreen] player selected character index ' + charIndex);
	}

	// These are for controlling the character scrolling functionality
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

	// These functions are defined to show character names on hovering their portraits
	onMouseEnterHandler = (charIndex) => {
		if (this.props.characters[charIndex]) // if exists
			this.setState({hoveredCharacterName: this.props.characters[charIndex]})
	}
	onMouseLeaveHandler = () => {
		// if character has been clicked, set name back to that after hover.
		this.state.clickedCharacterName ? 
		this.setState({hoveredCharacterName: this.state.clickedCharacterName })
		: this.setState({hoveredCharacterName: ''})
	}

	render() {
		let playerView = null;
		let userView = null;
		// Enable/disable player/user specific elements
		if (this.userIsPlayer()) {
			// Show scrolling character selection menu + character name
			playerView = (
				<React.Fragment>
					<p>{this.state.scroll}</p>
					<CharacterSelectButtons 
						characters={this.props.characters}
						scroll={this.state.scroll} 
						mouseEnter={(index) => this.onMouseEnterHandler(index)}
						mouseLeave={this.onMouseLeaveHandler}
						selected={(index) => this.characterSelectedHandler(index)}/>
					<ArrowButton left clicked={this.leftArrowClickedHandler}/>
					<ArrowButton clicked={this.rightArrowClickedHandler}/>
					<h1 className={classes.hoveredCharacter}> {this.state.hoveredCharacterName} </h1>
				</React.Fragment>
			)
		} else {
			userView = (
				<React.Fragment>
					<SelectedCharacters characterOne={this.props.characterOne} characterTwo={this.props.characterTwo}/>
					<h1 className={classes.vsHeader}> VS </h1>
					<Username screen="SELECT" username={this.props.playerOneUsername} left/>
					<Username screen="SELECT" username={this.props.playerTwoUsername}/>
					<CharacterName screen="SELECT" left character={this.props.characterOne}/>
					<CharacterName screen="SELECT" character={this.props.characterTwo} />
				</React.Fragment>
			)
			// Show both characters portraits (non-player view)
		} 

		return (
			<div className={this.props.class}> 
				<h1 className={classes.selectHeader}> FIGHTER SELECT </h1>
				{playerView}
				{userView}
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
        playerOneId: state.playerOneId,
        playerTwoId: state.playerTwoId,
        characterOne: state.characterOne,
        characterTwo: state.characterTwo,
        timer: state.timer,
        appUserId: state.appUserId,
        characters: state.characters
    };
}

export default connect(mapStateToProps)(SelectScreen);