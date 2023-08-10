import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';

function App() {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					{/* Ruta de pagina principal  */}
					<Route path="/" element={<MainPage />} />
					{/* Rutas del panel de administrador */}

					<Route path="/admin/panel" element={<AdminDashboard />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
