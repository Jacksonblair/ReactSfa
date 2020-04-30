import React from 'react';
import classes from './CharacterSelectButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterSelectButton = props => {

	let portraitClass = classes.portrait;
	let portraitDiv = null;
	let portraitStyle = null;
	// We get a character name, a url for the spritesheet, and a url for the portrait image
	// We also check for some default names, that only belong to default characters. 

	// Check if name belongs to a default character
	if (props.character.enabled) {
		switch (props.character.name.toLowerCase()) {
			case "koala":
				// build a default portrait class
				// $$ Right now its just koala.
				portraitClass = `${portraitClass} + ${classes.koala}`
				break;
			default:
				portraitClass = `${portraitClass} + ${classes.koala}`
				break;
		}
	} else {
		// If the character is not a default character
		// Build  a style using the portraitUrl
		portraitStyle = {
			backgroundImage: `url(${props.character.portraitUrl})`
		};
	}

	return (
		<button 
			onMouseEnter={() => props.mouseEnter(props.index)}
			onMouseLeave={() => props.mouseLeave()}
			className={classes.button} 
			onClick={() => props.selected(props.index)}>
			<div className={portraitClass} style={portraitStyle}/>
		</button>
	)
}

export default characterSelectButton;