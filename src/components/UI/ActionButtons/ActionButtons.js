import React from 'react';
import classes from './ActionButtons.css';
import ActionButton from './ActionButton/ActionButton';
const log = msg => window.Twitch.ext.rig.log(msg);

const actionButtons = props => {
	return (
		<React.Fragment>
			<div className={classes.ActionButtons}> 
				<ActionButton clicked={props.clicked} action="PA" lastAction={props.lastAction}/>
				<ActionButton clicked={props.clicked} action="SC" lastAction={props.lastAction}/>
				<ActionButton clicked={props.clicked} action="RO" lastAction={props.lastAction}/>
			</div>
		</React.Fragment>
	)
}

export default actionButtons;