import React, { useEffect } from 'react';
import classes from './FightResolutionIcon.css';

const log = msg => window.Twitch.ext.rig.log(msg);

const fightResolutionIcon = props => {

	let iconClass = classes.icon;

	// Different classes:
	//	.paper, .scissor, .rock
	// .leftWinner, .leftLoser, .leftTie
	// .rightWinner, .rightLoser, .rightTie

	switch(props.icon) {
		case "PA":
			iconClass = `${iconClass} + ${classes.paper}`;
			break;
		case "SC":
			iconClass = `${iconClass} + ${classes.scissors}`;
			break;
		case "RO":
			iconClass = `${iconClass} + ${classes.rock}`;
	}

	if (props.winner) {
		iconClass = props.left ? 
		`${iconClass} + ${classes.leftWinner}` 
		: `${iconClass} + ${classes.rightWinner}`;
	} else if (props.tie) {
		iconClass = props.left ? 
		`${iconClass} + ${classes.leftTie}` 
		: `${iconClass} + ${classes.rightTie}`;
	} else {
		iconClass = props.left ? 
		`${iconClass} + ${classes.leftLoser}` 
		: `${iconClass} + ${classes.rightLoser}`;
	} 

	return (
		<div className={iconClass}>
		
		</div>
	)
}

export default fightResolutionIcon;