import React from 'react';
import classes from './SelectedCharacter.css';

const log = msg => window.Twitch.ext.rig.log(msg);


const selectedCharacter = props => {

	let portraitBackgroundClass = null;
	let characterPortraitClass = null;
	let portraitStyle = null;


	// Assign left or right for portrait background
	if (props.left) {
		portraitBackgroundClass = `${classes.portraitBackground} + ${classes.left}`;
	} else {
		portraitBackgroundClass = `${classes.portraitBackground} + ${classes.right}`;
	}

	// if default char, switch on name and assign class
	if (props.character.enabled) {
		switch (props.character.name.toLowerCase()) {
			case "koala":
				// build a default portrait class
				// $$ Right now its just koala.
				characterPortraitClass = classes.koalaPortrait;
				break;
			default:
				characterPortraitClass = classes.koalaPortrait;
				break;
		}
	} else {
		// If the character is not a default character
		// Build  a style using the url
		portraitStyle = {
			backgroundImage: `url(${props.character.url})`
		};
	}

	return (
		<div className={portraitBackgroundClass}>
			<div className={characterPortraitClass} style={portraitStyle}/>
		</div>
	)
}

export default selectedCharacter;