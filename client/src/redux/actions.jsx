import axios from 'axios';
export const CREATE_USER = 'CREATE_USER';
export const LOG_USER = 'LOG_USER';

// Funcion para el registro del usuario, en el cual, detalla sus datos y elige el tipo de plan a adquirir.
export function createUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post(
				'http://localhost:3000/subcripcion',
				payload
			);
			return dispatch({
				type: CREATE_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para el log in del usuario ya registrado en la pagina.
export function logUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post('http://localhost:3000/login', payload);
			return dispatch({
				type: LOG_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
