import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOG_USER = 'LOG_USER';
export const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS';
export const SUSPEND_USER = 'SUSPEND_USER';
export const ACTIVATE_USER = 'ACTIVATE_USER';
export const VALIDATE_ADMIN = 'VALIDATE_ADMIN';
export const GET_SUSPENDED_CLIENTS = 'GET_SUSPENDED_CLIENTS';
export const VALIDATE_USER = 'VALIDATE_USER';
export const GET_LOCAL_DATA = 'GET_LOCAL_DATA';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const LOG_OUT = 'LOG_OUT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const CREATE_SUB_CATEGORY = 'CREATE_SUB_CATEGORY';
export const GET_PLANS = 'GET_PLANS';
export const GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';
export const PLAN_PRICE = 'PLAN_PRICE';
export const MODIF_DATA = 'MODIF_DATA';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_MENU_CATEGORIES = 'GET_MENU_CATEGORIES';

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

			return dispatch({
				type: LOG_USER,
				payload: info.data.token
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para cerrar sesion

export function logOutUser() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/logout', { headers })
				.then((response) => {
					return dispatch({
						type: LOG_OUT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para mostrar el precio de los planes
export function getPlans() {
	return async function (dispatch) {
		try {
			const info = await axios.get('http://localhost:3000/planes');
			return dispatch({
				type: GET_PLANS,
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
				});
			});
		} catch (error) {
			console.log(error);
		}
	};
}

//funcion para validar el ingreso de un usuario no admin
export function validateUser() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/dashboard', { headers })
				.then((response) => {
					return dispatch({
						type: VALIDATE_USER,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para cambiar el precio de los planes standard y premium
export function planPrice(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.put('http://localhost:3000/valores', payload);

			return dispatch({
				type: PLAN_PRICE,
				payload: info.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

// Funcion para modificar los datos del usuario

export function modifData(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.put('http://localhost:3000/actualizar', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: MODIF_DATA,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//FUNCIONALIDADES DE DASHBOARD DE CLIENTE

//funcionalidad para traer los datos del local

export function getLocalData(email) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get(`http://localhost:3000/dashboard/config?email=${email}`, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: GET_LOCAL_DATA,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//crear categoria

export function createCategory(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.post('http://localhost:3000/dashboard/newcategoria', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CREATE_CATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createSubCategory(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.post('http://localhost:3000/dashboard/newsubcategoria', payload, {
					headers
				})
				.then((response) => {
					return dispatch({
						type: CREATE_SUB_CATEGORY,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para mostrar todas las categorias del local
export function getCategories() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get('http://localhost:3000/dashboard/categorias', {
					headers
				})
				.then((response) => {
					return dispatch({
						type: GET_CATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para traer subcategorias correspondientes
export function getSubCategories(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage

			const headers = {
				'x-token': token
			};
			axios
				.get(
					`http://localhost:3000/dashboard/subcategorias?categoria=${payload}`,
					{
						headers
					}
				)
				.then((response) => {
					console.log(response.data);
					console.log('entro');
					return dispatch({
						type: GET_SUBCATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

//Funcion para crear un nuevo producto

export function createProduct(payload) {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token'); // Obtén el token almacenado en localStorage
			console.log('entrando1');
			const headers = {
				'x-token': token
			};
			axios
				.post(`http://localhost:3000/dashboard/items`, payload, {
					headers
				})

				.then((response) => {
					return dispatch({
						type: CREATE_PRODUCT,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

// funcion para mostrar los productos del local
//localhost:3000/dashboard/items?email=franbosco12@gmail.com
export function getProducts(payload) {
	return async function (dispatch) {
		try {
			axios
				.get(`http://localhost:3000/dashboard/items?email=${payload}`)
				.then((response) => {
					return dispatch({
						type: GET_PRODUCTS,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getMenuCategories(payload) {
	return async function (dispatch) {
		try {
			axios
				.get(`http://localhost:3000/menu/categorias?email=${payload}`)
				.then((response) => {
					return dispatch({
						type: GET_MENU_CATEGORIES,
						payload: response.data
					});
				});
		} catch (error) {
			console.log(error);
		}
	};
}
