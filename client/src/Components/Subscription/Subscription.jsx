import './Subscription.css';
import { IoRestaurantSharp } from 'react-icons/io5';
//Vista de imagen para comenzar la suscripcion al servicio
export default function Subscription() {
	return (
		<div className="subscription">
			<h2>
				Suscribete ahora y potencia tu negocio con nuestra innovadora plataforma
				gastronomica
			</h2>
			<div className="subscription-img">
				<IoRestaurantSharp className="icon" />
				<h3>$65.000,00 </h3>
				<p>Por mes</p>
				<ul className="subs-list">
					<li>1. Menu digital interactivo</li>
					<li>2. División de cuentas automatizada</li>
					<li>3. Gestión de pedidos eficiente</li>
					<li>4. Precios actualizados en tiempo real</li>
					<li>5. Soporte tecnico personalizado</li>
					<li>6. Experiencia culinaria mejorada</li>
				</ul>
				<a href="">
					<button className="subs-btn">Comprar ahora</button>
				</a>
			</div>
		</div>
	);
}
