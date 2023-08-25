import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOG_USER = 'LOG_USER';
export const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
export const SUSPEND_USER = 'SUSPEND_USER';
export const ACTIVATE_USER = 'ACTIVATE_USER';
export const VALIDATE_ADMIN = 'VALIDATE_ADMIN';
export const GET_SUSPENDED_CLIENTS = 'GET_SUSPENDED_CLIENTS';

//FUNCIONALIDADES DE LA PAGINA PRINCIPAL
// Funcion para el registro del usuario, en el cual, detalla sus datos y elige el tipo de plan a adquirir.
export function createUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post(
				'http://localhost:3000/subscription',
				payload
			);
			console.log('entro en create');
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
			console.log(info.data, 'data');
			return dispatch({
				type: LOG_USER,
				payload: info.data.token
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
			return dispatch({
				type: GET_ALL_CLIENTS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para traer solo los usuarios suspendidos.
export function getSuspendedClients() {
	return async function (dispatch) {
		try {
			const info = await axios.post('http://localhost:3000/status');
			return dispatch({
				type: GET_SUSPENDED_CLIENTS,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para suspender un usuario en particular
export function suspendUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/suspender', payload);

			return dispatch({
				type: SUSPEND_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para activar una cuenta suspendida de usuario
export function activateUser(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/activar', payload);

			return dispatch({
				type: ACTIVATE_USER,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para validar el ingreso del admin
export function validateAdmin() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios.get('http://localhost:3000/admin', { headers }).then((response) => {
				return dispatch({
					type: VALIDATE_ADMIN,
					payload: response.data
				}).catch((error) => console.log(error));
			});
		} catch (error) {
			console.log(error);
		}
	};
}
