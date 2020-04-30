import React from 'react';
import classes from './Avatar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

/* Checks to see if a fight is being shown.
Avoids re-rendering the component with diff winners/actions
for a different round than is supposed to be displayed*/
const shouldUpdateProps = (prevProps, nextProps) => {
	return prevProps.fightBeingShown === nextProps.fightBeingShown && prevProps.overallWinner === nextProps.overallWinner;
	return false;
}

const avatar = (props) => {

	let avatarClass = null;
	let avatarStyle = null;
	// Apply left and right classes..
	// Animations if first mount, static if an update

	if (!props.mounted && !props.overallWinner && !props.fightBeingShown) {
		log('[Avatar] First mount')
		if (props.player === 1) {
			avatarClass = `${classes.Avatar} + ${classes.slideInLeft}`;
		} else if (props.player === 2) {
			avatarClass = `${classes.Avatar} + ${classes.slideInRight}`;
		}	
	} else {
		log('[Avatar] Already mounted')
		if (props.player === 1) {
			avatarClass = `${classes.Avatar} + ${classes.left}`;
		} else if (props.player === 2) {
			avatarClass = `${classes.Avatar} + ${classes.right}`;
		}	
	}

	// if latest fight hasn't been shown, show it 
	// .. Unless there is an overallWinner
	if (props.fightBeingShown && !props.overallWinner) {
		log('[Avatar] Showing fight')
		if (props.winner) {
			if (props.player === props.winner) {
				avatarClass = `${avatarClass} + ${classes.winner}`
			} else if (props.winner === 3) {
				avatarClass = `${avatarClass} + ${classes.tie}`
			} else {
				avatarClass = `${avatarClass} + ${classes.loser}`
			}
		}
	}

	// Show overall winner/loser
	if (props.overallWinner) {
		log('[Avatar] Overwall winner')
		if (props.overallWinner === props.player) {
			avatarClass = `${avatarClass} + ${classes.overallWinner}`
		} else {
			avatarClass = `${avatarClass} + ${classes.overallLoser}`
		}
	}

	// Apply character classes

/*	winner={props.winner} 
	overallWinner={props.overallWinner}
	player={1}
	character={props.characterOne}
	mounted={props.mounted}
	// This prop controls class assignment
	fightBeingShown={props.fightBeingShown}
	default={defaultChar[0]}
	url={charUrl[0]}
*/
	/*
		if props.default, check against default characters
		else use url to mix inline style with avatarClass
	*/

	// Default character, switch on name and assign class.
	if (props.character.enabled) {
		switch (props.character.name.toLowerCase()) {
			case "koala":
				avatarClass = `${avatarClass} + ${classes.koalaSprite}`;
				break;
			default:
				avatarClass = `${avatarClass} + ${classes.koalaSprite}`;
				break;
		}
	// If not default, build style with props and combine with avatarClass
	} else {
		avatarStyle = {
			backgroundImage: `url(${props.url})`
		}
	}


	return (
		<React.Fragment>
			<div className={avatarClass} style={avatarStyle} />
		</React.Fragment>
	)		

}

export default React.memo(avatar, shouldUpdateProps);