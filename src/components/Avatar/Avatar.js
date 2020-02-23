import React from 'react';
import classes from './Avatar.css';
const log = msg => window.Twitch.ext.rig.log(msg);

/* Checks to see if a fight is being shown.
Avoids re-rendering the component with diff winners/actions
for a different round than is supposed to be displayed*/
const stillShowingFight = (prevProps, nextProps) => {
	return prevProps.fightTriggered === nextProps.fightTriggered && prevProps.overallWinner === nextProps.overallWinner;
}

const avatar = (props) => {

	let avatarClass = null;
	// Apply left and right classes..
	// Animations if first mount, static if an update

	if (!props.shown && !props.overallWinner && !props.fightTriggered) {
		if (props.player === 1) {
			avatarClass = `${classes.Avatar} + ${classes.slideInLeft}`;
		} else if (props.player === 2) {
			avatarClass = `${classes.Avatar} + ${classes.slideInRight}`;
		}	
	} else {
		if (props.player === 1) {
			avatarClass = `${classes.Avatar} + ${classes.left}`;
		} else if (props.player === 2) {
			avatarClass = `${classes.Avatar} + ${classes.right}`;
		}	
	}

	// assign winner and loser (or tie)
	if (props.fightTriggered && !props.overallWinner) {
		log('[Avatar] FightTriggered && no overallWinner');
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

	// assign overall winner/loser
	if (props.overallWinner) {
		if (props.overallWinner === props.player) {
			log('[Avatar] Player is overall winner')
			avatarClass = `${avatarClass} + ${classes.overallWinner}`
		} else {
			avatarClass = `${avatarClass} + ${classes.overallLoser}`
		}
	}

	// Apply character classes
	switch (props.character) {
		case "test":
			avatarClass = `${avatarClass} + ${classes.testCharacter}`;
			break;
		default:
			break;
	}

	return (
		<React.Fragment>
			<div className={avatarClass} />
		</React.Fragment>
	)		

}

export default React.memo(avatar, stillShowingFight);