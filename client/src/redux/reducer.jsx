import {
	LOG_USER,
	GET_ALL_CLIENTS,
	GET_SUSPENDED_CLIENTS,
	VALIDATE_ADMIN,
	VALIDATE_USER,
	GET_LOCAL_DATA,
	GET_CATEGORIES,
	GET_PLANS,
	GET_SUBCATEGORIES,
	GET_PRODUCTS,
	GET_MENU_CATEGORIES
} from './actions';

let initialState = {
	token: {},
	allUsers: [],
	validation: '',
	validationLocal: '',
	localData: {},
	localCategories: [],
	plans: {},
	localSubcategories: [],
	localProducts: [],
	menuCategories: []
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case LOG_USER:
			return {
				...state,
				token: action.payload
			};
		case GET_PLANS:
			return {
				...state,
				plans: action.payload
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
		case VALIDATE_USER:
			return {
				...state,
				validationLocal: action.payload
			};
		case GET_LOCAL_DATA:
			return {
				...state,
				localData: action.payload
			};
		case GET_CATEGORIES:
			return {
				...state,
				localCategories: action.payload
			};
		case GET_SUBCATEGORIES:
			return {
				...state,
				localSubcategories: action.payload
			};
		case GET_PRODUCTS:
			return {
				...state,
				localProducts: action.payload
			};
		case GET_MENU_CATEGORIES:
			return {
				...state,
				menuCategories: action.payload
			};
		default:
			return state;
	}
}
export default rootReducer;
