import React, { useEffect } from 'react';
import classes from './HpBars.css';
import HpBar from './HpBar/HpBar';

const log = msg => window.Twitch.ext.rig.log(msg);

const hpBars = props => {

	let hpBarsClass = null;
	let hpBarArray = [];

	// add 'screen' and left/right specific styles
	hpBarsClass = props.left ? 
		`${classes.HpBars} + ${classes.left}`
		: `${classes.HpBars} + ${classes.right}`;

	switch(props.hp) {
		case 0:
			hpBarArray.push(0, 0, 0)
			break;
		case 1: 
			hpBarArray.push(1, 0, 0)
			break;
		case 2:
			hpBarArray.push(1, 1, 0)
			break;		
		case 3:
			hpBarArray.push(1, 1, 1)
			break;
	}

	// @IMPORTANT
	// Hp will be recieved as integer 
	// 1 way
	// Each hpBar gets a value of 0 or 1
	// if 0, it will not render a visible bar
	// if the value changes while app is running
	// bar will animate into invisibility.

	return (
		<React.Fragment>
			<div className={hpBarsClass}>
				<HpBar value={hpBarArray[0]}/> 
				<HpBar value={hpBarArray[1]}/> 
				<HpBar value={hpBarArray[2]}/> 
			</div>
		</React.Fragment>
	)
}

export default hpBars;