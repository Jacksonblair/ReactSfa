import React from 'react';
import classes from './SneezeGuard.css';
const log = msg => window.Twitch.ext.rig.log(msg);

/*SneezeGuard component is some basic UX to stop non-player users 
from using the interface (because it will not function)*/

const sneezeGuard = props => {

	let msg = {}

	if (props.queue.includes(props.appUserId)) {
		msg = (
			<React.Fragment>
			<p className={classes.text}> You are in position X </p>
			</React.Fragment>
		)
	} else if (props.canPressPlay) {
		msg = (
			<React.Fragment>
			<button onClick={props.clicked} className={classes.playButton}> PLAY </button> 
			</React.Fragment>
		)
	} else {
		msg = (
			<React.Fragment>
			<p className={classes.text}> LOADING... </p>
			</React.Fragment>
		)
	}
	
	return (
		<React.Fragment>
			<div className={classes.SneezeGuard}>
				<div className={classes.backdrop}/>
				{msg}
			</div>
		</React.Fragment>
	)
}

export default sneezeGuard;