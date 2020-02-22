import React from 'react';
import classes from './Messages.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const fightMessage = props => {
	return (
		<React.Fragment>
			<h1 className={classes.FightMessage}> FIGHT! </h1>
		</React.Fragment>
	)
}

export default fightMessage;