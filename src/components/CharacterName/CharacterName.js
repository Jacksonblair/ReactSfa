import React from 'react';
import classes from './CharacterName.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const username = props => {

	let characterName = null;
	let characterNameClass = null;

	// check for username, else set default
	characterName = props.characterName ? props.characterName : "CHARACTER";

	// add left/right specific styles
	characterNameClass = props.left ? 
		`${classes.CharacterName} + ${classes.left}`
		: `${classes.CharacterName} + ${classes.right}`;

	return (
		<React.Fragment>
			<p className={characterNameClass}> {characterName} </p>
		</React.Fragment>
	)
}

export default username;