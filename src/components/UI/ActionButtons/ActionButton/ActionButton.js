import React from 'react';
import classes from './ActionButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const actionButton = props => {

	let buttonClass = null;

	switch(props.action) {
		case "PA":
			buttonClass = `${classes.ActionButton} + ${classes.paper}`;
			break;
		case "SC":
			buttonClass = `${classes.ActionButton} + ${classes.scissors}`;
			break;
		case "RO":
			buttonClass = `${classes.ActionButton} + ${classes.rock}`;
	}

	if (props.action === props.lastAction) {
		switch(props.lastAction) {
			case "PA":
				buttonClass = `${classes.lastActionButton} + ${classes.paper}`;
				break;
			case "SC":
				buttonClass = `${classes.lastActionButton} + ${classes.scissors}`;
				break;
			case "RO":
				buttonClass = `${classes.lastActionButton} + ${classes.rock}`;
		}		
	}

	return (
		<button className={buttonClass} onClick={() => {props.clicked(props.action) }} />
	)
}

export default actionButton;