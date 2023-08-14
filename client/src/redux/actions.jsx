import axios from 'axios';
export const CREATE_USER = 'CREATE_USER';
export const LOG_USER = 'LOG_USER';
export const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';

//FUNCIONALIDADES DE LA PAGINA PRINCIPAL
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

//FUNCIONALIDADES DE LA PAGINA DE ADMINISTRADOR
//funcion para traer la informacion de todos los clientes registrados.
export function getAllClients() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/mostrar');
			console.log(info.data, 'info');
			return dispatch({
				type: GET_ALL_CLIENTS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
