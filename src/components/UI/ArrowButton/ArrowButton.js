import React from 'react';
import classes from './ArrowButton.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const arrowButton = props => {

	// left or right styles
	let arrowClass = props.left ? 
	`${classes.ArrowButton} + ${classes.left}`
	: `${classes.ArrowButton} + ${classes.right}`

	let tip = props.left? 'left' : 'right'

	return (
		<button className={arrowClass} onClick={props.clicked}>
			{tip}
		</button>
	)
}

export default arrowButton;