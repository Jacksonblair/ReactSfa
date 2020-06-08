import * as actionTypes from './actions';
const log = msg => window.Twitch.ext.rig.log(msg);

const initialState = {
    queue: [],
    scores: [],
    results: [],
    round: 0,
    victor: 0,
    smited: 0,
    players: {},
    FSM: -1,

	appUserId: null,
	resolution: ['600', '600'],
	timedOut: false,
	roster: []
}

const reducer = (state = initialState, action) => {

	// log('[reducer.js]')
	// log(action)

	switch (action.type) {
		case actionTypes.GAME_STATE_UPDATE:
			return {
				...state, 
				queue: action.payload.gamestate.queue,
				scores: action.payload.gamestate.queue,
				results: {...action.payload.gamestate.results},
				round: action.payload.gamestate.round,
				victor: action.payload.gamestate.victor,
				defeated: action.payload.gamestate.defeated,
				players: action.payload.gamestate.players,
				FSM: action.payload.gamestate.FSM,
				tieLimit: action.payload.gamestate.tieLimit
			}
		case actionTypes.PLAYER_AUTH:
			return {
				...state,
				appUserId: action.payload.id
			}
		case actionTypes.ROSTER_UPDATE:
			return {
				...state,
				roster: action.payload.roster
			}
		case actionTypes.RESOLUTION_UPDATE:
			return {
				...state,
				resolution: action.payload.resolution
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