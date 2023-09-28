import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuCategories, getProducts } from '../../../redux/actions';
import queryString from 'query-string';
import './ClientMenuConfig.css';

export default function ClientMenuConfig() {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const url = window.location.href;
		const parsed = queryString.parseUrl(url);
		const email = parsed.query.email;
		dispatch(getMenuCategories(email));
		dispatch(getProducts(email));
	}, []);

	const categories = useSelector((state) => state.menuCategories.categorias);
	const products = useSelector((state) => state.localProducts);

	const handleCategorySelection = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const handleShowAll = () => {
		setSelectedCategory(null); // Reset selected category to show all products
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
				{products.map((categoria, index) => (
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
													key={producto.nombre + prodIndex}
													className="client-menu-product-container"
												>
													<div>
														<img
															src={producto.img}
															alt={producto.nombre}
															className="product-img"
														/>
													</div>
													<div className="product-info">
														<p className="product-name">{producto.nombre}</p>
														<p className="product-price">
															Precio: ${producto.precio}
														</p>
													</div>
												</li>
											))}
										</ul>
									</div>
								))}
							</>
						) : null}
					</div>
				))}
			</div>
		</main>
	);
}
