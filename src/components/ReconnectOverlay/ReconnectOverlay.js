import React from 'react';
import classes from './ReconnectOverlay.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const reconnectOverlay = props => {

	return (
		<div className={classes.ReconnectOverlay}>
			<button onClick={props.clicked}> RECONNECT </button>
		</div>
	)
}

export default reconnectOverlay;