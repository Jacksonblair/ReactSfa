import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

import FeedItem from '../FeedItem/FeedItem'

import classes from './Feed.css';

const log = msg => window.Twitch.ext.rig.log(msg);

class Feed extends Component {

	fsm = {
		waitingForPlayers: 1,
		hasPlayers: 2,
		checkingForInput: 3,
		resolvingRound: 4,
		roundResolved: 5,
		smitingPlayer: 6,
		endingMatch: 7,
		resettingGamestate: 8
	}

	state = {
		feed: [],
		introduced: [false],
		resolvingInput: [false],
		resolved: [false],
		ending: [false]
	}

	godDialogue = [
		'The gods are impatient...',
		'The gods are watchful...',
		'The gods care not...'
	]

	/* Notes */
	//
	// p1/p2.char is between 0 and n
	// p1/p2.actions is between 1 and 3
	// round is between 0 and n
	// ...so roster[p1.char].actions[p1.char.actions[round]]...
	// ...gives the dialogue for that action, for that character, for that attack, in that round
	// 
	// Dialogue fields:
	// - 	.intro (on game start, both player intros play)
	// -	.actions (3 vals, corresponding to scissors, paper and rock)
	// - 	.reactions (3 vals, as responses to above actions)
	// - 	.outro (on game end, only winner outro is played)
	// - 	.spared (reaction to being spared by gods) 
	//
	// NOTE: '*p' is written in dialogue to be replaced by usernames
	// NOTE: p1/p2.actions is decremented by one to be used as an index

	showIntroduction = (roster, p1, p2, round) => {

		// Get dialogue for gods, depending on tieLimit before smiting
		let godsIntro = null;
		if (this.props.tieLimit <= 2) { godsIntro = this.godDialogue[0]
		} else if (this.props.tieLimit <= 4) { godsIntro = this.godDialogue[1]
		} else { godsIntro = this.godDialogue[2] }

		return [
			{ type: 1, text: godsIntro },
			{ type: 1, username: p1.display_name, othername: p2.display_name, charname: roster[p1.char].name, text: roster[p1.char].intro },
			{ type: 1, username: p2.display_name, othername: p1.display_name, charname: roster[p1.char].name, text: roster[p2.char].intro }
		]
	}	

	showResolution = (roster, p1, p2, round) => {
		// check which player won and return the reaction for enemy player
		// also check if the round was a draw
		let reaction = null;
		if (this.props.results[round].winner == 10) {
			// TODO(Jack): Add range of 'tie' reactions and pick randomly
			reaction = 'The two attacks bounce off of each other harmlessly!'
		} else {
			reaction = (this.props.results[round].winner == 1) ? 
			roster[p1.char].reactions[p1.actions[round] - 1].replace('*p', p2.display_name)
			: roster[p2.char].reactions[p2.actions[round] - 1].replace('*p', p1.display_name)  
		}

		return [
			{ type: 1, text: roster[p1.char].actions[p1.actions[round] - 1].replace('*p', p1.display_name) },
			{ type: 1, text: roster[p2.char].actions[p2.actions[round] - 1].replace('*p', p2.display_name) },
			{ type: 1, text: reaction }
		]
	}

	showEnding = (roster, p1, p2, round) => {
		let ending = null;

		/* Smited ending */
		if (this.props.defeated == 10) {
			let [smited, spared] = (this.props.victor == 1) ? [p2, p1] : [p1, p2]
			ending = [
				// TODO(jack): Pick god message depending on no. of ties
				{ type: 1, text: 'The gods have lost their patience!'},
				{ type: 1, text: `${smited.display_name} was smited by the gods!` },
				{ type: 1, text: `${spared.display_name} is spared that fate!` },
				{ 
					type: 1, 
					username: spared.display_name,
					charname: roster[spared.char].name,
					othername: smited.display_name,
					text: roster[spared.char].spared.replace('*p', smited.display_name)
				}
			]
		/* Normal ending */
		} else {
			let [winner, loser] = (this.props.victor == 1) ? [p1, p2] : [p2, p1]
			ending = [
				{ type: 1, text: `${loser.display_name} is defeated!`},
				{ type: 1, text: `${winner.display_name} is the victor!`},
				{ 
					type: 1, 
					username: winner.display_name, 
					charname: roster[winner.char].name, 
					othername: loser.display_name,
					text: roster[winner.char].outro.replace('*p', loser.display_name)
				}
			]
		}
		return ending
	}

	setRoundIndexTrue = (arr) => {
		// Set this.props.round index of passed array to true
		let newArr = [...arr]
		newArr[this.props.round] = true;
		return newArr;
	}

	componentDidUpdate() {

		let roster = this.props.roster
		let p1 = this.props.players[0]
		let p2 = this.props.players[1]
		let round = this.props.round

		/* Notes */
		//
		// When each case is fulfilled...
		// I set that category of case to fulfilled for that round
		// ... using setRoundIndexTrue
		//
		// Then i get the objects for each bit of text
		// And push it to 'Feed', for each to be displayed as a 'FeedItem'

		switch(this.props.FSM) {

			case this.fsm.waitingForPlayers:
				console.log('waitingForPlayers')
				break;

			case this.fsm.hasPlayers:
				console.log('hasPlayers')
				if (!this.state.introduced[this.props.round]) {
					this.setState({
						introduced: this.setRoundIndexTrue(this.state.introduced),
						feed: [...this.state.feed, ...this.showIntroduction(roster, p1, p2, round)]
					})
				} break;

			case this.fsm.checkingForInput:
				console.log('checkingForInput')
				// TODO(Jack): Do i need this anymore?
				break;

			case this.fsm.resolvingRound:
				console.log('resolvingRound')
				if (!this.state.resolved[this.props.round]) {
					this.setState({ 
						resolved: this.setRoundIndexTrue(this.state.resolved),
						feed: [...this.state.feed, ...this.showResolution(roster, p1, p2, round)]
					})
				} break;

			case this.fsm.resettingGamestate:
				console.log('resettingGamestate')
				if (!this.state.ending[this.props.round]) {
					this.setState({
						ending: this.setRoundIndexTrue(this.state.ending),
						feed: [...this.state.feed, ...this.showEnding(roster, p1, p2, round)]
					})
				} break;
		}
	}

	render() {
		let gameFeed = this.state.feed.map((item, i) => {
			return (
				<FeedItem key={i} deets={item}/>
			)
		})

		return (
			<div className={classes.Feed}>
				{gameFeed}
			</div> 
		)
	}

}

const mapStateToProps = state => {
	return {
		players: state.players,
		queue: state.queue,
		results: state.results,
		round: state.round,
		victor: state.victor,
		defeated: state.defeated,
		FSM: state.FSM,
		roster: state.roster,
		tieLimit: state.tieLimit
	};
}

export default connect(mapStateToProps)(Feed)