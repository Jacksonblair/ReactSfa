import React from 'react';
import classes from './SneezeGuard.css';
const log = msg => window.Twitch.ext.rig.log(msg);

/*SneezeGuard component is some basic UX to stop non-player users 
from using the interface (because it will not function)*/

const sneezeGuard = props => {

	let msg = props.hasPressedPlay ? (
		<React.Fragment>
			<p className={classes.text}> 
			You joined the queue.
			</p>
		</React.Fragment>
	)
	: ( 
		<React.Fragment>
			<p className={classes.text}> 
			Press PLAY to join.			
			</p>
			<button onClick={props.clicked} className={classes.playButton}> PLAY </button> 
		</React.Fragment>
	);

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