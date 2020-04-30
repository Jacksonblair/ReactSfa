import React from 'react';
import classes from './Avatars.css';
import Avatar from './Avatar/Avatar'

const log = msg => window.Twitch.ext.rig.log(msg);

const Avatars = props => {
	return (
		<React.Fragment>
			<Avatar
				winner={props.winner} 
				overallWinner={props.overallWinner}
				player={1}
				character={props.characterOne}
				mounted={props.mounted}
				// This prop controls class assignment
				fightBeingShown={props.fightBeingShown}
			/>
			<Avatar 
				winner={props.winner} 
				overallWinner={props.overallWinner}
				player={2}
				character={props.characterTwo}
				mounted={props.mounted}
				// This prop controls class assignment
				fightBeingShown={props.fightBeingShown}
			/>
		</React.Fragment>
	)

}

export default Avatars;