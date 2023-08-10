import { LOG_USER } from './actions';

let initialState = {
	actualUser: {}
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case LOG_USER:
			return {
				...state,
				actualUser: action.payload
			};
		default:
			return state;
	}
}
export default rootReducer;
