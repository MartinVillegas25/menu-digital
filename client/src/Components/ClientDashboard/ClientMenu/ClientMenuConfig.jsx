import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getMenuCategories,
	getProducts
} from '../../../redux/actions';
import queryString from 'query-string';
import './ClientMenuConfig.css';
import swal from 'sweetalert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ClientMenuConfig() {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);

	const reorder = (list, startIndex, endIndex) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	useEffect(() => {
		const url = window.location.href;
		const parsed = queryString.parseUrl(url);
		const email = parsed.query.email;
		dispatch(getMenuCategories(email));
		dispatch(getProducts(email));
	}, []);
	const products = useSelector((state) => state.localProducts);
	const [prods, setProds] = useState(products);

	const categories = useSelector((state) => state.menuCategories.categorias);
	console.log(products);

	console.log(prods);

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

	return (
		<DragDropContext
			onDragEnd={(result) => {
				const { source, destination } = result;
				if (!destination) {
					return;
				}
				if (
					source.index === destination.index &&
					source.droppableId === destination.droppableId
				) {
					return;
				}

				setProds((prevProds) =>
					reorder(prevProds, source.index, destination.index)
				);
			}}
		>
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
								selectedCategory === c.nombre_categoria
									? 'selected-category'
									: ''
							}`}
							key={c.nombre_categoria + index}
							onClick={() => handleCategorySelection(c.nombre_categoria)}
						>
							{c.nombre_categoria}
						</button>
					))}
				</div>
				<div>
					{prods === undefined ? (
						<h3>Cargando</h3>
					) : (
						products.map((categoria, index) => (
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
												<Droppable droppableId="products">
													{(droppableProvided) => (
														<ul
															{...droppableProvided.droppableProps}
															ref={droppableProvided.innerRef}
															className="products-list"
														>
															{subcategoria.productos.map(
																(producto, prodIndex) => (
																	<Draggable
																		key={producto.nombre + prodIndex}
																		draggableId={producto.nombre + prodIndex}
																		index={prodIndex}
																	>
																		{(draggableProvided) => (
																			<li
																				className="client-menu-product-container"
																				{...draggableProvided.draggableProps}
																				ref={draggableProvided.innerRef}
																				{...draggableProvided.dragHandleProps}
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
																								onClick={() =>
																									handleEditPopUp(producto)
																								}
																								className="admin-product-btn"
																							>
																								Editar
																							</button>
																						</div>
																					</div>
																					{selectedProductForEdit ===
																					producto ? (
																						<div className="product-edit-popup">
																							<label htmlFor="">Nombre:</label>
																							<input
																								type="text"
																								name=""
																								id=""
																								placeholder={producto.nombre}
																							/>
																							<label htmlFor="">Precio:</label>
																							<input
																								type="text"
																								name=""
																								id=""
																								placeholder={producto.precio}
																							/>
																							<label htmlFor="">Imagen:</label>
																							<input
																								type="text"
																								name=""
																								id=""
																							/>

																							<button
																								onClick={() =>
																									setSelectedProductForEdit(
																										null
																									)
																								}
																							>
																								Cerrar
																							</button>
																						</div>
																					) : null}
																				</div>
																			</li>
																		)}
																	</Draggable>
																)
															)}
															{droppableProvided.placeholder}
														</ul>
													)}
												</Droppable>
											</div>
										))}
									</>
								) : null}
							</div>
						))
					)}
				</div>
			</main>
		</DragDropContext>
	);
}
