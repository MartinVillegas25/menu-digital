import io from 'socket.io-client';

import { useEffect } from 'react';
import './ClientHome.css';
import { useLocation } from 'react-router-dom';

const socket = io();
export default function ClientHome() {
	const aux = [
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '1',
			Pedido: 'Pizza y refresco',
			Entregado: true,
			Nombre: 'Juan',
			PidioCuenta: false,
			LLamoCamarera: true
		},
		{
			Mesa: '2',
			Pedido: 'Hamburguesa y papas',
			Entregado: true,
			Nombre: 'María',
			PidioCuenta: true,
			LLamoCamarera: false
		},
		{
			Mesa: '3',
			Pedido: 'Ensalada y agua',
			Entregado: false,
			Nombre: 'Carlos',
			PidioCuenta: false,
			LLamoCamarera: true
		}
	];
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	console.log(userEmail, 'desdeHOME');
	const cantidadMesas = 40;
	const mesasLibres = cantidadMesas - aux.length;
	const mesasOcupadas = aux.length;
	useEffect(() => {
		socket.on('connect', () => {
			console.log('conectado a la sala' + userEmail);
			socket.emit('join-room', { room: userEmail + '-llamar-camarera' });
			socket.emit('join-room', { room: userEmail + '-pedir-cuenta' });
			socket.emit('join-room', { room: userEmail });
		});

		socket.on('disconnect', () => {
			console.log('desconectado');
		});

		socket.emit('join-room', { room: userEmail });

		socket.on('estado-actual', (payload) => {
			console.log('payload', payload);

			const email = searchParams.get('email');
			console.log(payload[email][0]);

			if (payload[email][0]) {
				document.getElementById('lblTicket1').innerText = payload[email][0];
			}

			if (payload[email][1]) {
				document.getElementById('lblTicket2').innerText = payload[email][1];
			}

			if (payload[email][2]) {
				document.getElementById('lblTicket3').innerText = payload[email][2];
			}

			if (payload[email][3]) {
				document.getElementById('lblTicket4').innerText = payload[email][3];
			}
		});
	}, []);

	return (
		<main>
			<div className="client-home-container">
				<div>
					<div>
						<h2>Monitoreo del salon</h2>
						<h3>
							Mesas ocupadas: <span>{mesasOcupadas}</span> | Mesas libres :
							<span>{mesasLibres} </span>
						</h3>
					</div>
				</div>
				<div className="client-home">
					<div className="client-home-table-container">
						<table className="client-home-table">
							<thead className="">
								<tr>
									<th>Mesa</th>
									<th>Nombre</th>
									<th>Pedido</th>
									<th>Total</th>
									<th>Alertas</th>

									<th>-</th>
								</tr>
							</thead>
							<tbody className="client-table-body">
								{aux?.map((c, index) => {
									return (
										<tr key={c.Mesa + index}>
											<td>{c.Mesa}</td>
											<td>{c.Nombre}</td>
											<td>Ver</td>
											<td>0</td>
											<td>alerta</td>
											<td>
												<button className="client-home-table-btn">
													Liberar mesa
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="client-home-alerts">
						<div>
							<h1>SALA</h1>
							<table>
								<tbody>
									<tr>
										<td>
											<table>
												<tbody>
													<tr>
														<td valign="middle" className="ticket-actual">
															<span
																id="lblTicket1"
																className="ticket-actual-numero"
															></span>
															<span
																id="lblEscritorio1"
																className="ticket-actual-escritorio"
															></span>
														</td>
													</tr>
													<tr>
														<td>
															<span
																id="lblTicket2"
																className="ticket-secundario"
															></span>
															<span id="lblEscritorio2"></span>
														</td>
													</tr>
													<tr>
														<td>
															<span
																id="lblTicket3"
																className="ticket-secundario"
															></span>
															<span id="lblEscritorio3"></span>
														</td>
													</tr>
													<tr>
														<td>
															<span
																id="lblTicket4"
																className="ticket-secundario"
															></span>
															<span id="lblEscritorio4"></span>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
