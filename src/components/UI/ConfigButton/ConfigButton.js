import React from 'react';
import classes from './ConfigButton.css';

const configButton = props => {
	return (
		<button className={classes.configButton} onClick={props.clicked}>
			CONFIG
		</button>
	)
}

export default configButton;