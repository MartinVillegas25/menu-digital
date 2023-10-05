import AlertChart from '../../Menu/AlertChart/AlertChart';
import './ClientHome.css';
import { useLocation } from 'react-router-dom';
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
						<AlertChart />
					</div>
				</div>
			</div>
		</main>
	);
}
