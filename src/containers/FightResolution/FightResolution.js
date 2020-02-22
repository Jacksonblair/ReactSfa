import React, { Component } from 'react';
import classes from './FightResolution.css';
import FightResolutionIcon from '../../components/FightResolutionIcon/FightResolutionIcon';

const log = msg => window.Twitch.ext.rig.log(msg);

class FightResolution extends Component {

	state = {
		winner: null
	}

	resolveFight = () => {
		const actions = ["PA", "SC", "RO"]; // use indexes to calculate result
		let a = actions.indexOf(this.props.p1Action);
		let b = actions.indexOf(this.props.p2Action);

		if (a === b) { 
			return 3; // tie
		} else if ((a - b + 3) % 3 == 1) {
			return 1; // player 1 wins
		} else {
			return 2; // player 2 wins
		}
	}

	componentDidMount = () => {
		// Determining winner of fight (or if tie)
		let winner = this.resolveFight()
		this.setState({winner: winner});
		log('[Fight] winner is player: ' + winner);
	}

	render() {

		let fighterIcons = (
			<React.Fragment>
				<FightResolutionIcon left 
					winner={this.state.winner === 1 ? true : false}
					tie={this.state.winner === 3 ? true : false}
					icon={this.props.p1Action}
					/>
				<FightResolutionIcon 
					winner={this.state.winner === 2 ? true : false}
					tie={this.state.winner === 3 ? true : false}
					icon={this.props.p2Action}
					/>
			</React.Fragment>
		)

		return (
			<React.Fragment>
				<div className={classes.Darkener}/>
				<div className={classes.FightBox}>
					{fighterIcons}
				</div>
			</React.Fragment>
		)	
	}

}

export default FightResolution;