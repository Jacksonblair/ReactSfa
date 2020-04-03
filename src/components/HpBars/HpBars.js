import React, { useEffect } from 'react';
import classes from './HpBars.css';
import HpBar from './HpBar/HpBar';
import TurboHpBar from './TurboHpBar/TurboHpBar';

const log = msg => window.Twitch.ext.rig.log(msg);

const hpBars = props => {

	let hpBarsClass = null;
	let turboHpBarsClass = null;
	let turboTextClass = null;
	let hpBarArray = [];
	let turboHpBarArray = [];

	// add 'screen' and left/right specific styles
	hpBarsClass = props.left ? 
		`${classes.HpBars} + ${classes.left}`
		: `${classes.HpBars} + ${classes.right}`;
	turboHpBarsClass = props.left ? 
		`${classes.TurboHpBars} + ${classes.turboLeft}`
		: `${classes.TurboHpBars} + ${classes.turboRight}`;

	turboTextClass = props.turboHp ? classes.full : classes.empty;
	turboTextClass = props.left ? `${turboTextClass} + ${classes.turboTextLeft}`
		: `${turboTextClass} + ${classes.turboTextRight}`


	switch(props.turboHp) {
		case 0:
			turboHpBarArray.push(0, 0, 0)
			break;
		case 1: 
			turboHpBarArray.push(1, 0, 0)
			break;
		case 2:
			turboHpBarArray.push(1, 1, 0)
			break;		
		case 3:
			turboHpBarArray.push(1, 1, 1)
			break;
	}

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
				<div className={classes.innerBar}/>
				<HpBar value={hpBarArray[0]}/> 
				<HpBar value={hpBarArray[1]}/> 
				<HpBar value={hpBarArray[2]}/> 
			</div>
			<div className={turboHpBarsClass}>
				<TurboHpBar value={turboHpBarArray[0]}/> 
				<TurboHpBar value={turboHpBarArray[1]}/> 
				<TurboHpBar value={turboHpBarArray[2]}/> 
			</div>
			<p className={turboTextClass}> TURBO </p>
		</React.Fragment>
	)
}

export default hpBars;