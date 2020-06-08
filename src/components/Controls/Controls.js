import React from 'react';
import classes from './Controls.css';

const log = msg => window.Twitch.ext.rig.log(msg);

const Controls = props => {
	return (
		<React.Fragment>
			<div className={classes.Controls}>
				<button 
				className={classes.ControlButton}
				onClick={props.clicked}>
					PLAY
				</button>
			</div> 
		</React.Fragment>
	)

}

export default Controls;