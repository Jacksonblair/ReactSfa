import React from 'react';
import classes from './FightResolution.css';
import FightResolutionIcon from '../FightResolutionIcon/FightResolutionIcon';

const log = msg => window.Twitch.ext.rig.log(msg);


/* Checks to see if a fight is being shown.
Avoids re-rendering the component with diff winners/actions
for a different round than is supposed to be displayed*/

const fightResolution = props =>  {

	let fighterIcons = (
		<React.Fragment>
			<FightResolutionIcon left 
				winner={props.winner === 1 ? true : false}
				tie={props.winner === 3 ? true : false}
				icon={props.p1Action}
				/>
			<FightResolutionIcon 
				winner={props.winner === 2 ? true : false}
				tie={props.winner === 3 ? true : false}
				icon={props.p2Action}
				/>
		</React.Fragment>
	)

	return (
		<React.Fragment>
			<div className={classes.Darkener}/>
			<div className={classes.FightBox}>
				{fighterIcons}
			</div>
		</React.Fragment>
	)	

}

export default fightResolution;