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
	round: 1,
	winner: [],
	overallWinner: null,
	nextPlayerOne: '',
	nextPlayerTwo: ''
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
				playerOneUsername: action.payload.gameState.playerOneUsername,
				playerTwoUsername: action.payload.gameState.playerTwoUsername,
				round: action.payload.gameState.round,
				winner: [...action.payload.gameState.winner],
				overallWinner: action.payload.gameState.overallWinner,
				characterOne: action.payload.gameState.characterOne,
				characterTwo: action.payload.gameState.characterTwo,
		        nextPlayerOne: action.payload.gameState.nextPlayerOne,
		        nextPlayerTwo: action.payload.gameState.nextPlayerTwo
			}
	}
	return state;
}

export default reducer;