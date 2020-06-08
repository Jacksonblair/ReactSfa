import React from 'react'

import classes from './FeedItem.css'

const FeedItem = props => {

	// TODO(Jack): Add logic to format feed items based on props.type

	/*
	- Player username (username)
	- Other player username (othername)
	- Character name (charname)
	- + text and type
	*/

	return (
		<div className={classes.Item}>
			{props.deets.text}
		</div>
	)
}

export default FeedItem;