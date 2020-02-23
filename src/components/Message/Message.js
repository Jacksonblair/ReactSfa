import React from 'react';
import classes from './Message.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const message = props => {

	let messageClass = null;
	if (props.type === "FIGHT") {
		messageClass = classes.fightMessage;
	} else if (props.type === "WINNER") {
		messageClass = classes.winnerMessage;
	}

	return (
		<React.Fragment>
			<h1 className={messageClass}>
				{props.children}
			</h1>
		</React.Fragment>
	)
}

export default message;