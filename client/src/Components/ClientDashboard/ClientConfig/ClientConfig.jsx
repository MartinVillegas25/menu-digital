/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { changePlan, getLocalData, modifData } from '../../../redux/actions';
import './ClientConfig.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';

export default function ClientConfig() {
	const user = useSelector((state) => state.localData.usuario);

	useEffect(() => {
		if (user) {
			setInput({
				storeName: user.storeName,
				telefono: user.telefono,
				address: user.address
			});
		}
	}, [user]);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		storeName: '',
		address: '',
		telefono: ''
	});

	const [popUpOpen, setPopUpOpen] = useState(false);
	const handlepopUp = () => {
		setPopUpOpen(!popUpOpen);
	};

	const [planPopUpOpen, setPlanPopUpOpen] = useState(false);
	const handlePlanPopUp = () => {
		setPlanPopUpOpen(!planPopUpOpen);
	};

	useEffect(() => {
		dispatch(getLocalData(userEmail));
	}, []);

	const handleChangeData = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};
	const [newPlan, setNewPlan] = useState();
	const handleChangePlan = (e) => {
		setNewPlan({ plan: e.target.value });
	};

	const handleSubmitData = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: 'Esta seguro que desea modificar los datos?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(modifData(input));
				swal({
					text: `Se han modificadao los datos`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se han modificado los datos', icon: 'info' });
			}
		});
	};

	const handleSubmitNewPlan = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: 'Esta seguro que desea modificar su plan?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(changePlan(newPlan));
				swal({
					text: `Se han modificadao su plan`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se han modificado su plan', icon: 'info' });
			}
		});
	};

	return (
		<main className="client-config">
			<div className={popUpOpen === true ? ' backdrop' : ''}>
				<div
					className={popUpOpen === true ? 'client-data-popup' : 'popup-hidden'}
				>
					<div className="client-data-popup-container">
						<div className="client-data-popup-btn">
							<button onClick={handlepopUp}>X</button>
						</div>
						<h1>Modificar datos</h1>
						<label htmlFor="">Nuevo nombre del local:</label>
						<input
							type="text"
							name="storeName"
							value={input.storeName}
							onChange={handleChangeData}
						/>
						<label htmlFor="">Nueva direccion:</label>
						<input
							type="text"
							name="address"
							value={input.address}
							onChange={handleChangeData}
						/>
						<label htmlFor="">Nuevo telefono</label>
						<input
							type="text"
							name="telefono"
							value={input.telefono}
							onChange={handleChangeData}
						/>
						<button className="submit-btn" onClick={handleSubmitData}>
							Modificar
						</button>
					</div>
				</div>
			</div>
			<div>
				<div className="client-config-container">
					<div className="client-config-personal">
						<h3>Datos Personales</h3>
						<h4>
							Nombre del local: <span>{user?.storeName}</span>
						</h4>
						<h4>
							Direccion: <span>{user?.address}</span>
						</h4>
						<h4>
							Telefono: <span>{user?.telefono}</span>
						</h4>
						<h4>
							Mail: <span>{user?.email}</span>
						</h4>
						<button className="client-config-btn" onClick={handlepopUp}>
							Modificar datos
						</button>
					</div>

					<div className="client-config-plan">
						<h3>Plan adquirido</h3>
						<h4>{user?.plan}</h4>
						<button className="client-config-btn" onClick={handlePlanPopUp}>
							Actualizar plan
						</button>
					</div>
				</div>
				<div className="client-config-qr-container">
					<a
						href={`http://127.0.0.1:5173/dashboard/qrgenerator?email=${userEmail}`}
					>
						<button className="client-config-btn">Generar codigos Qr</button>
					</a>
				</div>
			</div>
			<div className={planPopUpOpen === true ? ' backdrop' : ''}></div>
			<div
				className={
					planPopUpOpen === true ? 'client-plan-popup' : 'popup-hidden'
				}
			>
				<div className="client-data-popup-btn">
					<button onClick={handlePlanPopUp}>X</button>
				</div>
				<div className="client-plan-select">
					<select name="plan" id="" onClick={handleChangePlan}>
						<option value="">Actual: {user?.plan}</option>
						<option value="basic">Basic</option>
						<option value="standard">Standard</option>
						<option value="premium">Premium</option>
					</select>
				</div>
				<div className="plan-btn">
					<button className="submit-plan-btn" onClick={handleSubmitNewPlan}>
						Cambiar mi plan
					</button>
				</div>
			</div>
		</main>
	);
}
