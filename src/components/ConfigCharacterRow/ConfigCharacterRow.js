import React from 'react';
import classes from './ConfigCharacterRow.css';

const log = msg => window.Twitch.ext.rig.log(msg);

const configCharacterRow = props =>  {

	/*
		props.index is the index of this character in roster
	*/

	let characterRow = null;

	// if a default character from roster
	if (props.default) {
		characterRow = (
			<div className={ props.enabled ? classes.characterRow : classes.characterRowDisabled}>
				<button className={classes.characterRowButton} type="submit" onClick={ () => props.changeEnabled(props.index) }> {props.enabled ? "DISABLE" : "ENABLE"}</button>
				<div className={classes.characterName}> {props.name} </div>
			</div>
		)
	// if a character is custom
	} else {
		characterRow = (
			<div className={classes.characterRow} key={props.index}>
				<input placeholder="character name" id="name" type="text" name="name" value={props.name} onChange={(e) => props.changedName(e, props.index)}/>
				<input placeholder="spritesheet url" id="url" type="text" name="url" value={props.url} onChange={(e) => props.changedUrl(e, props.index)}/>
				<input placeholder="portrait url" id="url" type="text" name="portraiturl" value={props.portraitUrl} onChange={(e) => props.changedPortraitUrl(e, props.index)}/>
				<button className={classes.characterRowButton}type="submit" onClick={() => props.deleted(props.index)}> DELETE </button>
			</div>
		)
	}

	return (
		<React.Fragment>
			{characterRow}
		</React.Fragment>
	)

}

export default configCharacterRow;