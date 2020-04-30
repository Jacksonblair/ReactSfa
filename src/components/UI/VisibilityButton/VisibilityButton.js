import React from 'react';
import classes from './VisibilityButton.css';

const visibilityButton = props => {
	// gets visibility of view as props.hidden

	return (
		<button className={classes.visibilityButton} onClick={props.clicked}>
			HIDE
		</button>
	)
}

export default visibilityButton;