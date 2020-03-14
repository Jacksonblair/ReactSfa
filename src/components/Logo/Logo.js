import React from 'react';
import classes from './Logo.css';

const logo = props => {
	return (
		<div className={classes.Logo}>
			<img className={classes.primary} src={require("../../assets/images/logo.png")}/>
			<div className={classes.secondary}/>
		</div>
	)
}

export default logo;