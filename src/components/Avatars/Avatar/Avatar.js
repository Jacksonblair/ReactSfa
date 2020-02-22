import React from 'react';
import classes from './Avatar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const avatar = props => {

	let avatarClass = null;

	avatarClass = props.left ? 
	`${classes.Avatar} + ${classes.left} + ${classes.slideInLeft}`
	: `${classes.Avatar} + ${classes.right} + ${classes.slideInRight}`;

	return (
		<React.Fragment>
			<div className={avatarClass}> </div>
		</React.Fragment>
	)
}

export default avatar;