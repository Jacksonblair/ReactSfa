import React from 'react';
import classes from './Avatars.css';
import Avatar from './Avatar/Avatar'

const log = msg => window.Twitch.ext.rig.log(msg);

const Avatars = props => {
	let keyCharacters = ['Koala', 'Coffee', 'Dickhead']
	let defaultChar = [false, false];
	let charUrl = ['']

	console.log(props.roster)


	// Sort out character stuff
	// If a default character, tell <Avatar> cha racter is default and switch on default classes by name
	let arr = [props.characterOne, props.characterTwo]

	arr.forEach((value, index) => {
		if (keyCharacters.includes(value)) {
			defaultChar[index] = true;
		} else {
			// So character is not default... Therefore it must be in the roster (IF ITS NOT SOMETHINGS FUCKED UP)
			// Here i need the url, corresponding to the character name
			let charIndex = props.roster.map(function(e) { return e.name; }).indexOf(arr[index]);
			// Then i need to store the url of the correct character in the roster, which i pass to the <Avatar>
			charUrl[index] = props.roster[charIndex].url;
		}
	})

	console.log(defaultChar)
	console.log(charUrl)
	console.log(arr)

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
				default={defaultChar[0]}
				url={charUrl[0]}
			/>
			<Avatar 
				winner={props.winner} 
				overallWinner={props.overallWinner}
				player={2}
				character={props.characterTwo}
				mounted={props.mounted}
				// This prop controls class assignment
				fightBeingShown={props.fightBeingShown}
				default={defaultChar[1]}
				url={charUrl[1]}
			/>
		</React.Fragment>
	)

}

export default Avatars;