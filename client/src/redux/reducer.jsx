import { LOG_USER, GET_ALL_CLIENTS } from './actions';

let initialState = {
	actualUser: {},
	allUsers: []
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case LOG_USER:
			return {
				...state,
				actualUser: action.payload
			};
		case GET_ALL_CLIENTS:
			return {
				...state,
				allUsers: action.payload
			};
		default:
			return state;
	}
}
export default rootReducer;
