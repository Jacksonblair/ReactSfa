import React from 'react';
import classes from './Scroller.css';
const log = msg => window.Twitch.ext.rig.log(msg);

const scroller = props => {

	let scrollerStyle = {
		left: props.scroll.toString() + '%'
	}

	return (
		<div className={classes.Scroller} style={scrollerStyle}>
			{props.children}
		</div>
	)
}

export default scroller;