import './FirstView.css';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';

//Primera vista de la página web
export default function FirstView() {
	return (
		<main className="fv">
			<div className="fv-container">
				<div className="fv-text">
					<div className="fv-title">
						<h2>Servicio</h2>
						<h2>impecable para</h2>
						<h2>clientes</h2>
						<h2>satisfechos</h2>
					</div>
					<div>
						<p>
							Gestioná pedidos de manera inteligente y optimizá tiempos de
							espera para un serivcio impecable. ¡Marcá la diferencia en el
							competitivo mundo gastronómico y convertite en el favorito de
							todos!
						</p>
						<div className="circles">
							<div className="circle">
								<BsInstagram />
							</div>
							<div className="circle">
								<FaFacebook />
							</div>
							<div className="circle">
								<BsWhatsapp />
							</div>
						</div>
					</div>
				</div>
				<div className="fv-imgs">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<button className="fv-plan-btn">
					<a href="#suscripcion">Ver planes</a>
				</button>
			</div>
		</main>
	);
}
