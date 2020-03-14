import React from 'react';
import classes from './CharacterSelectButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterSelectButton = props => {

	return (
		<button 
			onMouseEnter={() => props.mouseEnter(props.index)}
			onMouseLeave={() => props.mouseLeave()}
			className={classes.selectButton} 
			onClick={() => props.selected(props.index)}>
			Character select button
		</button>
	)
}

export default characterSelectButton;