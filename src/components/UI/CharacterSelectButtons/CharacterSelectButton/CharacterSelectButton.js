import React from 'react';
import classes from './CharacterSelectButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterSelectButton = props => {

	let portraitClass = null;
	let portraitDiv = null;
	let keyCharacters = ['Koala', 'Coffee', 'Dickhead']
	// We get a character name, a url for the spritesheet, and a url for the portrait image
	// We also check for some default names, that only belong to default characters. 

	// Check if name belongs to a default character
	if (keyCharacters.includes(props.name)) {
		// build a default portrait class
		// $$ Right now its just koala.
		portraitClass = `${classes.portrait} + ${classes.koala}`
		// Tack it on to the portrait div obj
		portraitDiv = ( <div className={portraitClass}/> )
	} else {
	// If the character is not a default character
		// Build a portrait class using the portrait url	
		let divStyle = {
			backgroundImage: `url(${props.portraitUrl})`
		};
		portraitDiv = <div className={portraitClass} style={divStyle}/> 
	}

	return (
		<button 
			onMouseEnter={() => props.mouseEnter(props.index)}
			onMouseLeave={() => props.mouseLeave()}
			className={classes.button} 
			onClick={() => props.selected(props.index)}>
			{portraitDiv}
		</button>
	)
}

export default characterSelectButton;