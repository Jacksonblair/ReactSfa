import React from 'react';
import classes from './CharacterSelectButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterSelectButton = props => {

	return (
		<div className={classes.selectButton} onClick={() => props.selected(props.index)}>
			<p>{props.index}</p>
		</div>
	)
}

export default characterSelectButton;