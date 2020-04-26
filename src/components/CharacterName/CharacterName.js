import React from 'react';
import classes from './CharacterName.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterName = props => {

	let characterNameClass = null;

	// check 'screen' that characterName is in
	characterNameClass = props.left ? `${classes.characterName} + ${classes.left}`
		: `${classes.characterName} + ${classes.right}`;

	log(props)

	return (
		<React.Fragment>
			<p className={characterNameClass}> {props.character} </p>
		</React.Fragment>
	)
}

export default characterName;