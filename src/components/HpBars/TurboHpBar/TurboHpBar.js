import React, { useEffect } from 'react';
import classes from './TurboHpBar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const turboHpBar = props => {

	//@IMPORTANT - check if there is turbo at all, to prevent flash animation.
	let turboHpBarClass = '';

	turboHpBarClass = props.value === 1 ?
	classes.full : classes.empty;

	useEffect(() => {


	}, [])

	return (
		<React.Fragment>
			<div className={turboHpBarClass}/>
		</React.Fragment>
	)
}

export default turboHpBar;