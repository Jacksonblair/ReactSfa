import React from 'react';
import classes from './CharacterName.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const characterName = props => {

	let characterName = null;
	let characterNameClass = null;

	// check 'screen' that characterName is in
	if (props.screen === "SELECT") {
		characterNameClass = classes.selectCharacterName
		if (props.left) {
			characterNameClass = `${characterNameClass} + ${classes.selectLeft}`
		} else {
			characterNameClass = `${characterNameClass} + ${classes.selectRight}`		
		}
	} else if (props.screen === "FIGHT") {
		characterNameClass = classes.fightCharacterName
		if (props.left) {
			characterNameClass = `${characterNameClass} + ${classes.fightLeft}`
		} else {
			characterNameClass = `${characterNameClass} + ${classes.fightRight}`		
		}
	}




	return (
		<React.Fragment>
			<p className={characterNameClass}> {/*props.character*/} CHARACTER </p>
		</React.Fragment>
	)
}

export default characterName;