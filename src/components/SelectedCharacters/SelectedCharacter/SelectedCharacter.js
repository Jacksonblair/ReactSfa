import React from 'react';
import classes from './SelectedCharacter.css';

const log = msg => window.Twitch.ext.rig.log(msg);


const selectedCharacter = props => {

	/*
	Get character for each player from props
	Assign portrait to correct class to get correct background image
	*/

	let portraitBackgroundClass = null;
	let characterPortraitClass = null;

	if (props.left) {
		portraitBackgroundClass = `${classes.portraitBackground} + ${classes.left}`;
	} else {
		portraitBackgroundClass = `${classes.portraitBackground} + ${classes.right}`;
	}

	switch(props.character) {
		default:
			characterPortraitClass = classes.koalaPortrait;
	}

	return (
		<div className={portraitBackgroundClass}>
			<div className={characterPortraitClass} />
		</div>
	)
}

export default selectedCharacter;