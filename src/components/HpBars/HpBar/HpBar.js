import React from 'react';
import classes from './HpBar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const hpBar = props => {

	let hpBarClass = props.value === 1 ?
	classes.full : classes.empty;

	return (
		<React.Fragment>
			<div className={hpBarClass}>
				{props.value}
			</div>
		</React.Fragment>
	)
}

export default hpBar;