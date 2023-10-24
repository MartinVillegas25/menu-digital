import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getMenuCategories,
	getProducts,
	modifyProduct
} from '../../../redux/actions';
import queryString from 'query-string';
import './ClientMenuConfig.css';
import swal from 'sweetalert';

export default function ClientMenuConfig() {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedProductForEdit, setSelectedProductForEdit] = useState({});

	useEffect(() => {
		const url = window.location.href;
		const parsed = queryString.parseUrl(url);
		const email = parsed.query.email;
		dispatch(getMenuCategories(email));
		dispatch(getProducts(email));
	}, []);
	const products = useSelector((state) => state.localProducts);
	console.log(products);

	const categories = useSelector((state) => state.menuCategories.categorias);

	const handleCategorySelection = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const handleShowAll = () => {
		setSelectedCategory(null);
	};

	const handleDeleteProduct = (e) => {
		e.preventDefault();
		swal({
			title: 'Activar',
			text: 'Desea eliminar este producto?',
			icon: 'warning',
			buttons: ['No', 'Si']
		}).then((respuesta) => {
			if (respuesta) {
				dispatch(deleteProduct(e.target.value));
				swal({
					text: `Se ha eliminado el producto`,
					icon: 'success'
				});
				setTimeout(function () {
					window.location.reload(true);
				}, 2000);
			} else {
				swal({ text: 'No se ha eliminado el producto', icon: 'info' });
			}
		});
	};

	const handleEditPopUp = (product) => {
		setSelectedProductForEdit(product);
	};

	const [input, setInput] = useState({
		nombre: '',
		precio: 0,
		img: ''
	});

	const handleChangeProduct = (e) => {
		setInput((prevInput) => ({
			...prevInput,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmitChanges = (e) => {
		e.preventDefault();
		console.log(input);
		dispatch(modifyProduct(selectedProductForEdit.id, input));
	};

	return (
		<main className="products-container">
			<div className="menu-config-admin-categories">
				<button
					className={`menu-config-admin-btn ${
						selectedCategory === null ? 'selected-category' : ''
					}`}
					onClick={handleShowAll}
				>
					Todas
				</button>
				{categories?.map((c, index) => (
					<button
						className={`menu-config-admin-btn ${
							selectedCategory === c.nombre_categoria ? 'selected-category' : ''
						}`}
						key={c.nombre_categoria + index}
						onClick={() => handleCategorySelection(c.nombre_categoria)}
					>
						{c.nombre_categoria}
					</button>
				))}
			</div>
			<div>
				{products === undefined ? (
					<h3>Cargando</h3>
				) : (
					products?.map((categoria, index) => (
						<div key={categoria.categoria + index}>
							{selectedCategory === null ||
							selectedCategory === categoria.categoria ? (
								<>
									<h2 className="category-title">{categoria.categoria}</h2>
									{categoria.subcategorias.map((subcategoria, subIndex) => (
										<div key={subcategoria.subcategoria_id + subIndex}>
											<h2 className="subcategory-title">
												{subcategoria.subcategoria}
											</h2>
											<ul className="products-list">
												{subcategoria.productos.map((producto, prodIndex) => (
													<li
														className="client-menu-product-container"
														key={prodIndex}
													>
														<div>
															<div className="product-list-display">
																<div>
																	<img
																		src={producto.img}
																		alt={producto.nombre}
																		className="product-img"
																	/>
																</div>
																<div className="product-info">
																	<p className="product-name">
																		{producto.nombre}
																	</p>
																	<p className="product-price">
																		Precio: ${producto.precio}
																	</p>
																</div>
																<div className="admin-product-btn-container">
																	<button
																		value={producto.id}
																		onClick={handleDeleteProduct}
																		className="admin-product-btn"
																	>
																		Eliminar
																	</button>
																	<button
																		onClick={() => handleEditPopUp(producto)}
																		className="admin-product-btn"
																	>
																		Editar
																	</button>
																</div>
															</div>
															{selectedProductForEdit === producto ? (
																<div className="product-edit-popup">
																	<form
																		action=""
																		onChange={handleChangeProduct}
																	>
																		<label htmlFor="">Nombre:</label>
																		<input
																			type="text"
																			name="nombre"
																			id=""
																			value={input.nombre}
																		/>
																		<label htmlFor="">Precio:</label>
																		<input
																			type="number"
																			name="precio"
																			id=""
																			value={input.precio}
																		/>
																		<label htmlFor="">Imagen:</label>
																		<input
																			type="file"
																			name="img"
																			id=""
																			value={input.img}
																		/>
																		<button
																			type="submit"
																			onClick={handleSubmitChanges}
																		>
																			Realizar cambios
																		</button>
																	</form>
																	<button
																		onClick={() =>
																			setSelectedProductForEdit(null)
																		}
																	>
																		Cerrar
																	</button>
																</div>
															) : null}
														</div>
													</li>
												))}
											</ul>
										</div>
									))}
								</>
							) : null}
						</div>
					))
				)}
			</div>
		</main>
	);
}
