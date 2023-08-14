import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import AdminDashboardHome from './Components/AdminDashboard/AdminDashboardHome';
import AdminDashboardClients from './Components/AdminDashboard/AdminDashboardClients';
import AdminDashboardConfig from './Components/AdminDashboard/AdminDashboardConfig';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					{/* Ruta de pagina principal  */}
					<Route path="/" element={<MainPage />} />
					{/* Rutas del panel de administrador */}

					<Route path="/admin/panel" element={<AdminDashboardHome />} />
					<Route path="/admin/clientes" element={<AdminDashboardClients />} />
					<Route
						path="/admin/configuracion"
						element={<AdminDashboardConfig />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
