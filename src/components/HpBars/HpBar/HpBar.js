import React from 'react';
import classes from './HpBar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const hpBar = props => {
	return (
		<React.Fragment>
			<div className={classes.HpBar}>
				{props.value}
			</div>
		</React.Fragment>
	)
}

export default hpBar;