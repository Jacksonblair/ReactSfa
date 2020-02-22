import React from 'react';
import classes from './CharacterSelectButtons.css';
const log = msg => window.Twitch.ext.rig.log(msg);

import CharacterSelectButton from './CharacterSelectButton/CharacterSelectButton'
import Scroller from './Scroller/Scroller';

const characterSelectButtons = props => {

	return (
		<div className={classes.SelectButtons}>
			<Scroller scroll={props.scroll}>
				<CharacterSelectButton index={2} selected={props.selected}/>
				<CharacterSelectButton index={1} selected={props.selected}/>
			</Scroller>
		</div>
	)
}

export default characterSelectButtons;