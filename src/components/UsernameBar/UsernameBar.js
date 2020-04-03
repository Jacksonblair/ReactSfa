import React from 'react';
import classes from './UsernameBar.css';

const log = msg => window.Twitch.ext.rig.log(msg);

const usernameBar = props => {

	let un1 = "VILGEFARTZ"
	let un2 = "BIGASSHOLE"

	return (
		<React.Fragment>
		<div className={classes.usernameBar}>
			<p className={classes.name}>{props.playerOneUsername}</p>
			<p>{'\u00A0'}VS{'\u00A0'}</p>
			<p className={classes.name}>{props.playerTwoUsername}</p>
		</div>				
		<div className={`${classes.usernameBar} + ${classes.second}`}>
			<p className={classes.name}>{props.playerOneUsername}</p>
			<p>{'\u00A0'}VS{'\u00A0'}</p>
			<p className={classes.name}>{props.playerTwoUsername}</p>
		</div>			
		</React.Fragment>
	)
}

export default usernameBar;