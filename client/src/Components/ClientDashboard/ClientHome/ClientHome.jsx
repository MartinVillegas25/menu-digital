import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import './ClientHome.css';
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

	const cantidadMesas = 40;
	const mesasLibres = cantidadMesas - aux.length;
	const mesasOcupadas = aux.length;

	return (
		<main>
			<div className="client-home-container">
				<div>
					<h2>Monitoreo del salon</h2>
					<h3>
						Mesas ocupadas: <span>{mesasOcupadas}</span> | Mesas libres :{' '}
						<span>{mesasLibres} </span>
					</h3>
				</div>
				<div className="client-home-table-container">
					<table className="client-home-table">
						<thead className="">
							<tr>
								<th>Mesa</th>
								<th>Pedido</th>
								<th>Entregado</th>
								<th>Nombre</th>
								<th>Pidio cuenta</th>
								<th>Llamo camarera</th>
								<th>-</th>
							</tr>
						</thead>
						<tbody className="client-table-body">
							{aux?.map((c) => {
								return (
									<tr key={c.id}>
										<td>{c.Mesa}</td>
										<td>Ver</td>
										{c.Entregado === true ? (
											<td>
												<BsCheckCircle className="check-icon" />
											</td>
										) : (
											<td>
												<BsXCircle className="X-icon" />
											</td>
										)}
										<td>{c.Nombre}</td>
										<td>
											{c.PidioCuenta === true ? (
												<td>
													<BsCheckCircle className="check-icon" />
												</td>
											) : (
												<td>
													<BsXCircle className="X-icon" />
												</td>
											)}
										</td>
										<td>
											{c.LLamoCamarera === true ? (
												<td>
													<BsCheckCircle className="check-icon" />
												</td>
											) : (
												<td>
													<BsXCircle className="X-icon" />
												</td>
											)}
										</td>
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
			</div>
		</main>
	);
}
