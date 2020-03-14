import React from 'react';
import classes from './TurboButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const turboButton = props => {

	return (
		<button className={classes.TurboButton} onClick={props.clicked}>
			TURBO!
		</button>
	)
}

export default turboButton;