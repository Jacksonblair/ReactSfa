import React from 'react';
import classes from './CharacterSelectButtons.css';
const log = msg => window.Twitch.ext.rig.log(msg);

import CharacterSelectButton from './CharacterSelectButton/CharacterSelectButton'
import Scroller from './Scroller/Scroller';

const characterSelectButtons = props => {

	let buttons = props.characters.map((value, index) => {
		return <CharacterSelectButton 
			mouseEnter={props.mouseEnter} 
			mouseLeave={props.mouseLeave}
			index={index} 
			selected={props.selected}
			key={index}
			character={value}/>
	})

	return (
		<div className={classes.SelectButtons}>
			<Scroller scroll={props.scroll}>
				{buttons}
			</Scroller>
		</div>
	)
}

export default characterSelectButtons;