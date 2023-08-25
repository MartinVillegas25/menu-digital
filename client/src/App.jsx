import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import AdminDashboardHome from './Components/AdminDashboard/AdminDashboardHome';
import AdminDashboardClients from './Components/AdminDashboard/AdminDashboardClients';
import AdminDashboardConfig from './Components/AdminDashboard/AdminDashboardConfig';
import ClientDashboardHome from './Components/ClientDashboard/ClientDashboardHome';
import ClientDashboardMenu from './Components/ClientDashboard/ClientDashboardMenu';
import ClientDashboardConfig from './Components/ClientDashboard/ClientDashboardConfig';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					{/* Ruta de pagina principal  */}
					<Route path="/" element={<MainPage />} />
					{/* Rutas del panel de administrador */}

					<Route path="/admin" element={<AdminDashboardHome />} />
					<Route path="/admin/clientes" element={<AdminDashboardClients />} />
					<Route
						path="/admin/configuracion"
						element={<AdminDashboardConfig />}
					/>

					{/* Rutas del panel de cada cliente */}
					<Route path="/client/salon" element={<ClientDashboardHome />} />
					<Route path="/client/menu" element={<ClientDashboardMenu />} />
					<Route
						path="/client/configuracion"
						element={<ClientDashboardConfig />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
