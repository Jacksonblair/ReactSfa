import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'
import axios from 'axios'

import Controls from '../../components/Controls/Controls'
import Feed from '../Feed/Feed'

import classes from './View.css'
const log = window.Twitch ? msg => window.Twitch.ext.rig.log(msg) : null


class View extends Component {
	//if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
	twitch = window.Twitch ? window.Twitch.ext : null

	state = {
		finishedLoading: false,
		canPressPlay: true,
		canPressPlayTimeout: null
	}

	clickedPlayHandler = () => {
		// If user is allowed to press play 
		// Tell server to handle user
		if (this.state.canPressPlay) { 
			axios.post('/play')
			.then((res) => {
				log(res)
			}).catch((err) => {
				log(err)
			})
		}

		// stop user from pressing play again before timeout
		this.setState({ 
			canPressPlayTimeout: 
				setTimeout(() => {
					this.setState({canPressPlay: true})
				}, 5000), 
			canPressPlay: false
		})
	}

	userIsPlayer = () => {
		// TODO(jack): Rewrite to correc variables
		return this.props.appUserId == this.props.playerOneId || this.props.appUserId == this.props.playerTwoId
	}

	render(){

		let screen = null
		let controls = null

		if (!this.state.finishedLoading && this.props.roster.length) {
			// If view is minimized
			if (this.state.minimized) {
				screen = (
					<div className={classes.minimizedView}>
					{/* TODO(jack): Write minimised block*/}
					</div>
				)
			// else show the normal view
			} else {
				controls = <Controls clicked={this.clickedPlayHandler}/>
				screen = (
					<div className={classes.view}>
						<Feed />
					</div>
				)
			}
		// If app hasnt finished *loasding*, show this.
		} else {
			screen = (
				<div>
					<div className={classes.view}>
						<p> Loading </p>
					</div>
				</div>
			)
		}

		return (
			<div className={classes.container}> 
				{screen}
				{controls}
				{/*<Console/>*/}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		appUserId: state.appUserId,
		roster: state.roster
	};
}

export default connect(mapStateToProps)(View)