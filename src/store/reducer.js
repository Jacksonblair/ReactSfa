import * as actionTypes from './actions';
const log = msg => window.Twitch.ext.rig.log(msg);

const initialState = {
	screen: null,
	playerOneUsername: null,
	playerTwoUsername: null,
    playerOneHp: 3,
    playerTwoHp: 3,
	playerOneActions: [],
	playerTwoActions: [],
	characterOne: null,
	characterTwo: null,
	timer: 10,
	round: 1
}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
		case actionTypes.GAME_STATE_UPDATE:
			return {
				...state, 
				screen: action.payload.gameState.screen,
				timer: action.payload.gameState.timer,
				playerOneHp: action.payload.gameState.playerOneHp,
				playerTwoHp: action.payload.gameState.playerTwoHp,
				playerOneActions: [...action.payload.gameState.playerOneActions],
				playerTwoActions: [...action.payload.gameState.playerTwoActions],
				round: action.payload.gameState.round
			}
	}
	return state;
}

export default reducer;