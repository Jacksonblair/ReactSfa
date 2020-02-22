import React from 'react';
import classes from './Avatars.css';
import Avatar from './Avatar/Avatar';
const log = msg => window.Twitch.ext.rig.log(msg);

const avatars = props => {
	return (
		<React.Fragment>
			<Avatar left />
			<Avatar />
		</React.Fragment>
	)
}

export default avatars;