import React from 'react';
import classes from './TurboHpBar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const turboHpBar = props => {

	let turboHpBar = props.value === 1 ?
	classes.full : classes.empty;

	return (
		<React.Fragment>
			<div className={turboHpBar}>
				{props.value}
			</div>
		</React.Fragment>
	)
}

export default turboHpBar;