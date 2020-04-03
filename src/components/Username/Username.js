import React from 'react';
import classes from './Username.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const username = props => {

	// @@IMPORTANT
	// Username should recieve the 'screen' prop not dynamically
	// But as a fixed value for whichever 'screen' its mounted on

	let username = null;
	let usernameClass = null;

	// check for username
	if (props.username) {
		// log('[Username] Has username');
		username = props.username
	} else {
		// log('[Username] No username');
		username = props.left ? 'PLAYER 01' : 'PLAYER 02'
	}

	// add 'screen' and left/right specific styles
	switch (props.screen) {
		case "START":
			usernameClass = props.left ? 
				`${classes.Start} + ${classes.startLeft}`
				: `${classes.Start} + ${classes.startRight}`;
			break;
		case "SELECT":
			usernameClass = props.left ? 
				`${classes.Select} + ${classes.selectLeft}`
				: `${classes.Select} + ${classes.selectRight}`;
			break;
		case "NEXT":
			break;
	}

	return (
		<React.Fragment>
			<p className={usernameClass}> {username.toUpperCase()} </p>
		</React.Fragment>
	)
}

export default username;