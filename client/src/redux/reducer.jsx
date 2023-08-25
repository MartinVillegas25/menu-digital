import {
	LOG_USER,
	GET_ALL_CLIENTS,
	GET_SUSPENDED_CLIENTS,
	VALIDATE_ADMIN
} from './actions';

let initialState = {
	token: {},
	allUsers: [],
	validation: ''
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case LOG_USER:
			return {
				...state,
				token: action.payload
			};
		case GET_ALL_CLIENTS:
			return {
				...state,
				allUsers: action.payload
			};

		case GET_SUSPENDED_CLIENTS:
			return {
				...state,
				allUsers: action.payload
			};
		case VALIDATE_ADMIN:
			return {
				...state,
				validation: action.payload
			};
		default:
			return state;
	}
}
export default rootReducer;
