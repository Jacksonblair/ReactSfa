import React from 'react';
import classes from './SelectedCharacter.css';

const log = msg => window.Twitch.ext.rig.log(msg);


const selectedCharacter = props => {

	let selectedCharacterClass = null;
	if (props.left) {
		selectedCharacterClass = `${classes.SelectedCharacter} + ${classes.left}`;
	} else {
		selectedCharacterClass = `${classes.SelectedCharacter} + ${classes.right}`;
	}

	return (
		<div className={selectedCharacterClass}>
			{props.character}
		</div>
	)
}

export default selectedCharacter;