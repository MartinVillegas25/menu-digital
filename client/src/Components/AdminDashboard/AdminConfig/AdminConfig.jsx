import { useEffect, useState } from 'react';
import './AdminConfig.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllClients,
	getPlans,
	modifData,
	planPrice,
	validateAdmin
} from '../../../redux/actions';
import swal from 'sweetalert';

export default function AdminConfig() {
	const dispatch = useDispatch();
	const plans = useSelector((state) => state.plans);
	const validation = useSelector((state) => state.validation.msg);
	const dataAdmin = useSelector((state) => state.validation);
	console.log(dataAdmin);
	const [planStandardInput, setPlanStandardInput] = useState('');
	const [planPremiumInput, setPlanPremiumInput] = useState('');
	const [input, setInput] = useState({
		name: '',
		telefono: '',
		address: ''
	});

	const handleChangeData = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
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

	const handleChangeStandard = (e) => {
		setPlanStandardInput(e.target.value);
	};
	const handleChangePremium = (e) => {
		setPlanPremiumInput(e.target.value);
	};

	const handleSubmitPlan = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: `Esta seguro que los nuevos precios sean standard: $ ${planStandardInput} y premium: $ ${planPremiumInput}??`,
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(
					planPrice({
						standard: planStandardInput,
						premium: planPremiumInput
					})
				);
				swal({
					text: `Se ha modificadao el precio`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'no se ha modificado el precio', icon: 'info' });
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			}
		});
	};

	useEffect(() => {
		dispatch(getAllClients());
		dispatch(validateAdmin());
		dispatch(getPlans());
	}, []);

	// Actualiza el valor de los input siempre que se modifiquen los planes
	useEffect(() => {
		if (plans) {
			setPlanPremiumInput(plans.premium);
			setPlanStandardInput(plans.standard);
		}
	}, [plans]); // Actualiza cuando 'planes' cambie sus valores

	useEffect(() => {
		if (dataAdmin) {
			setInput({
				name: dataAdmin.name,
				telefono: dataAdmin.telefono,
				address: dataAdmin.address
			});
		}
	}, [dataAdmin]);

	return (
		<div>
			{planPremiumInput === undefined ||
			planStandardInput === undefined ||
			!dataAdmin ||
			!dataAdmin.name ||
			!dataAdmin.address ||
			!dataAdmin.telefono ||
			!dataAdmin.email ? (
				<div>
					<h1>Cargando</h1>
				</div>
			) : (
				<>
					{validation !== 'admin' ? (
						<h1>Usted no tiene acceso </h1>
					) : (
						<main className="admin-config-container">
							<div>
								<div className="admin-config-info">
									<div>
										<h3>Nombre:</h3> <h4>{dataAdmin.name || ''}</h4>
									</div>
									<div>
										<h3>Direccion:</h3> <h4>{dataAdmin.address}</h4>
									</div>
									<div>
										<h3>Teléfono: </h3>
										<h4>{dataAdmin.telefono}</h4>
									</div>
									<div>
										<h3>Mail: </h3>
										<h4>{dataAdmin.email}</h4>
									</div>
								</div>
							</div>
							<div className="admin-functions-panel">
								<div className="admin-functions-panel-container">
									<div className="admin-changedata">
										<h2>Modificar datos</h2>
										<input
											type="text"
											placeholder="Nombre"
											name="name"
											value={input.name}
											onChange={handleChangeData}
										/>
										<input
											type="text"
											placeholder="Direccion"
											name="address"
											value={input.address}
											onChange={handleChangeData}
										/>
										<input
											type="text"
											placeholder="Telefono"
											name="telefono"
											value={input.telefono}
											onChange={handleChangeData}
										/>
										<button
											className="admin-config-submit-btn"
											onClick={handleSubmitData}
										>
											Modificar
										</button>
									</div>
									<div className="admin-changedata">
										<h2>Modificar precio de planes</h2>
										<div>
											<label>Estandar: </label>
											<input
												type="text"
												value={planStandardInput}
												onChange={handleChangeStandard}
											/>
										</div>
										<div>
											<label>Premium:</label>
											<input
												type="text"
												value={planPremiumInput}
												onChange={handleChangePremium}
											/>
										</div>
										<button
											onClick={handleSubmitPlan}
											className="admin-config-submit-btn"
										>
											Modificar
										</button>
									</div>
								</div>
							</div>
						</main>
					)}
				</>
			)}
		</div>
	);
}
