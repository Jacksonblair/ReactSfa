//@IMPORTANT
// This file acts as a fake server.
// Any output from this file into the gamestate
// should mimic the servers packet output exactly.
// Currently...
// Variables from the state are being fed directly back
// in from the central store because the variables in this
// file are transient. Maybe i could turn it into a class?

class fakeServer {
	constructor() {
		this.screen = '',
		this.timer = 10,
		this.playerOneHp = 3,
		this.playerTwoHp = 3,
		this.playerOneActions = [],
		this.playerTwoActions = [],
		this.round = 1
	}

	getStartScreen () {
		this.state.screen = "START";
		return fakeGameState;
	}

	getSelectScreen () {
		this.state.screen = "SELECT";
		return fakeGameState;
	}

	getFightScreen () {
		this.state.screen = "FIGHT";
		return fakeGameState;
	}

	incrementTimer (timer) {
		this.state.timer = timer + 1;
		return fakeGameState;
	}

	decrementTimer (timer) {
		this.state.timer = timer - 1;
		return fakeGameState;
	}

	incrementPlayerOneHp (hp) {
		if (hp + 1 <= 3) {
			this.state.playerOneHp = hp + 1;
			return this.state;
		}
		return this.state;
	}

	decrementPlayerOneHp (hp) {
		if (hp - 1 >= 0) {
			this.state.playerOneHp = hp - 1;
			return this.state;
		}
		return this.state;
	}

	incrementPlayerTwoHp (hp) {
		if (hp + 1 <= 3) {
			this.state.playerTwoHp = hp + 1;
			return this.state;
		}
		return this.state;
	}

	decrementPlayerTwoHp (hp) {
		if (hp - 1 >= 0) {
			this.state.playerTwoHp = hp - 1;
			return this.state;
		}
		return fakeGameState;
	}

	playerAction (action, player, round) {
		if (player === 1) {
			this.state.playerOneActions[round - 1] = action;
		} else {
			this.state.playerTwoActions[round - 1] = action;
		}
		return this.state;
	}

	nextRound (round) {
		this.state.round = round + 1;
		return this.state;
	}

}

export default fakeServer;