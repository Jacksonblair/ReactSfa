import React from 'react';
import classes from './CharacterSelectButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterSelectButton = props => {

	let portraitClass = null;

	// switch on character
	switch(props.character) {
		default:
			portraitClass = `${classes.portrait} + ${classes.koala}`
	}
	// assign portrait

	return (
		<button 
			onMouseEnter={() => props.mouseEnter(props.index)}
			onMouseLeave={() => props.mouseLeave()}
			className={classes.button} 
			onClick={() => props.selected(props.index)}>
			<div className={portraitClass}/>
		</button>
	)
}

export default characterSelectButton;