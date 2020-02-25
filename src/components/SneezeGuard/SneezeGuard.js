import React from 'react';
import classes from './SneezeGuard.css';
const log = msg => window.Twitch.ext.rig.log(msg);

/*SneezeGuard component is some basic UX to stop non-player users 
from using the interface (because it will not function)*/

const sneezeGuard = props => {
	return (
		<React.Fragment>
			<div className={classes.SneezeGuard}>
				<div className={classes.backdrop}/>
				<p className={classes.text}> 
					You are not currently a player. <br />
 					Press PLAY to join the queue. 				
				</p>
				<button onClick={props.clicked} className={classes.playButton}> PLAY </button>
			</div>
		</React.Fragment>
	)
}

export default sneezeGuard;