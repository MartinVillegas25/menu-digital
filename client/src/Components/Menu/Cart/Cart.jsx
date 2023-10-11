import { removeFromMinicart } from '../../../redux/actions';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() {
	const micart = useSelector((state) => state.productsAdeedToMinicart);
	console.log(micart);
	const dispatch = useDispatch();

	// Calcular la suma de los precios
	const totalPrice = micart.reduce(
		(total, product) => total + product.precio,
		0
	);

	const handleQuit = (e) => {
		dispatch(removeFromMinicart(e.target.value));
	};

	return (
		<div className="cart-container">
			{micart.map((product, index) => (
				<div key={index}>
					<div className="minicart-product">
						<img src={product.img} alt="" className="minicart-prod-img" />
						<h2 className="minicart-prod-name">{product.nombre}</h2>
						<h2 className="minicart-prod-price">$ {product.precio}</h2>

						<button
							value={product.id}
							onClick={(e) => handleQuit(e)}
							className="cart-quit-btn"
						>
							X
						</button>
					</div>
				</div>
			))}
			<div>
				<div className="comment-area-container">
					<h4>Desea dejar algun comentario?</h4>
					<textarea
						name="comentario"
						id=""
						cols="36"
						rows="6"
						className="comment-area"
					></textarea>
				</div>
				<div>
					<button>Enviar pedido</button>
				</div>
			</div>
			<h2 className="minicart-total-price">Total: $ {totalPrice}</h2>{' '}
			{/* Muestra la suma total */}
		</div>
	);
}
