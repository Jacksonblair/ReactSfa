import React from 'react';
import classes from './ActionButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const actionButton = props => {
	return (
		<button 
			className={classes.ActionButton}
			onClick={() => props.clicked(props.action)}
			> {props.action} </button>
	)
}

export default actionButton;