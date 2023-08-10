import './FunctionsPanel.css';
export default function FunctionPanel() {
	return (
		<div className="admin-functions-panel">
			<div className="admin-functions-panel-container">
				<h1>Ceo Fundador</h1>
				<h4>Pablo Ramirez</h4>
				<button className="admin-functions-btn">Eliminar subscripcion</button>
				<button className="admin-functions-btn">Mensaje global</button>
				<button className="admin-functions-btn">Modificar planes</button>
			</div>
		</div>
	);
}
