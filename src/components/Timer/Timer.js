import React from 'react';
import classes from './Timer.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const timer = props => {

	// @@IMPORTANT
	// Username should recieve the 'screen' prop not dynamically
	// But as a fixed value for whichever 'screen' its mounted on

	let timerClass = null;

	// add 'screen' and left/right specific styles
	switch (props.screen) {
		case "SELECT":
			timerClass = props.left ? 
				`${classes.SelectTimer} + ${classes.left}`
				: `${classes.SelectTimer} + ${classes.right}`;
			break;
		case "FIGHT":
			timerClass = classes.FightTimer;
			break;
		case "NEXT":
			break;
	}

	return (
		<React.Fragment>
			<h1 className={timerClass}> {props.timer} </h1>
		</React.Fragment>
	)
}

export default timer;