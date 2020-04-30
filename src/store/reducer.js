import * as actionTypes from './actions';
const log = msg => window.Twitch.ext.rig.log(msg);

const initialState = {
	screen: "START",
	appUserId: null,
	playerOneId: null,
	playerTwoId: null,
	playerOneUsername: null,
	playerTwoUsername: null,
    playerOneHp: 3,
    playerTwoHp: 3,
	playerOneActions: [],
	playerTwoActions: [],
	playerOneTurboHp: 0,
	playerTwoTurboHp: 0,
	characterOne: null,
	characterTwo: null,
	timer: 10,
	round: 1,
	winner: [],
	overallWinner: null,
	roster: [''],
	scores: [''],
	turboUsername: null,
	queue: [''],
	resolution: ['600', '600'],
	timedOut: false
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
				playerOneTurboHp: action.payload.gameState.playerOneTurboHp,
				playerTwoTurboHp: action.payload.gameState.playerTwoTurboHp,
				playerOneActions: [...action.payload.gameState.playerOneActions],
				playerTwoActions: [...action.payload.gameState.playerTwoActions],
				playerOneUsername: action.payload.gameState.playerOneUsername,
				playerTwoUsername: action.payload.gameState.playerTwoUsername,
				round: action.payload.gameState.round,
				winner: [...action.payload.gameState.winner],
				overallWinner: action.payload.gameState.overallWinner,
				characterOne: action.payload.gameState.playerOneCharacter,
				characterTwo: action.payload.gameState.playerTwoCharacter,
		        playerOneId: action.payload.gameState.playerOneId,
		        playerTwoId: action.payload.gameState.playerTwoId,
		        timer: action.payload.gameState.timer,
		        scores: [...action.payload.gameState.scores],
		        turboUsername: action.payload.gameState.turboUsername,
		        queue: [...action.payload.gameState.queue]
			}
		case actionTypes.PLAYER_AUTH:
			return {
				...state,
				appUserId: action.payload.id
			}
		case actionTypes.ROSTER_UPDATE:
			return {
				...state,
				roster: [...action.payload.roster]
			}
		case actionTypes.RESOLUTION_UPDATE:
			return {
				...state,
				resolution: [...action.payload.resolution]
			}
		case actionTypes.TIMEOUT_UPDATE:
			return {
				...state,
				timedOut: action.payload.timedOut
			}

	}
	return state;
}

export default reducer;