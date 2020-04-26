import React from 'react';
import classes from './SelectedCharacters.css';
import SelectedCharacter from './SelectedCharacter/SelectedCharacter';

const log = msg => window.Twitch.ext.rig.log(msg);

const selectedCharacters = props => {
	return (
		<div className={classes.SelectedCharacters}>
			<SelectedCharacter left character={props.characterOne}/>
			<SelectedCharacter character={props.characterTwo}/>
		</div>
	)
}

export default selectedCharacters;