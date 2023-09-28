/* eslint-disable no-unused-vars */
import './ClientMenu.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
	createCategory,
	createProduct,
	createSubCategory,
	getCategories,
	getSubCategories
} from '../../../redux/actions';
import { useEffect, useState } from 'react';
import ClientMenuConfig from './ClientMenuConfig';

export default function ClientMenu() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, []);
	const categories = useSelector((state) => state.localCategories.categorias);
	console.log(categories);

	const [newCategory, setNewCategory] = useState('');

	const handleChangeCategory = (e) => {
		setNewCategory(e.target.value);
	};
	const handleCreateCateg = () => {
		dispatch(createCategory({ nombre_categoria: newCategory }));
		setNewCategory('');
		setCategorySelected('');
	};

	const [categorySelected, setCategorySelected] = useState('');
	const handleselectCategory = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
	};

	const handleselectCategoryToSub = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
		dispatch(getSubCategories(e.target.value));
	};

	const handleselectCategoryToProd = (e) => {
		e.preventDefault();
		setCategorySelected(e.target.value);
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		dispatch(getSubCategories(e.target.value));
	};
	const [newSubCategory, setNewSubCategory] = useState('');
	const handleChangeSubCategory = (e) => {
		setNewSubCategory(e.target.value);
	};
	const subcategories = useSelector(
		(state) => state.localSubcategories.subcategorias
	);
	console.log(subcategories);

	const handleCreateSubCategory = () => {
		dispatch(
			createSubCategory({
				subcategoria: newSubCategory,
				categoria: categorySelected
			})
		);
		setCategorySelected('');
		setNewCategory('');
	};

	const [subCategorySelected, setSubCategorySelected] = useState('');
	const handleselectSubCategory = (e) => {
		e.preventDefault();
		setSubCategorySelected(e.target.value);
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const [input, setInput] = useState({
		nombre: '',
		categoria: '',
		subcategoria: '',
		precio: 0,
		img: ''
	});
	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};
	const handleCreateProdcut = (e) => {
		dispatch(createProduct(input));
		console.log(input);
		setInput({
			nombre: '',
			categoria: '',
			subcategoria: '',
			precio: 0,
			img: ''
		});
	};

	console.log(input);

	return (
		<main className="client-create-menu-container">
			<div className="create-menu-container">
				<h2 className="create-menu-tittle">Creacion del menu</h2>
				<h4>Titulo del menu:</h4>
				<div>
					<div className="create-menu-add-btn">
						<span></span>
						Añadir nueva categoria{' '}
						<button onClick={handleCreateCateg}>
							<MdAddCircle className="create-menu-add-icon" />
						</button>
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<input
							type="text"
							value={newCategory}
							onChange={handleChangeCategory}
						/>
					</div>
					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Categorias existentes: </label>
							<select name="" id="" onChange={handleselectCategory}>
								{' '}
								<option value="">-</option>
								{categories?.map((a, index) => (
									<option
										value={a.nombre_categoria}
										key={a.nombre_categoria + index}
									>
										{a.nombre_categoria}
									</option>
								))}
							</select>
						</div>
						<button className="create-menu-delete-btn">
							<AiOutlineDelete className="create-menu-delete-icon" />
						</button>
					</div>
				</div>
				<div>
					<button
						className="create-menu-add-btn"
						onClick={handleCreateSubCategory}
					>
						<span></span>
						Añadir sub categoria
						<span>
							<MdAddCircle className="create-menu-add-icon" />
						</span>
					</button>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<select name="" id="" onChange={handleselectCategoryToSub}>
							<option value="">-</option>
							{categories?.map((a, index) => (
								<option
									value={a.nombre_categoria}
									key={a.nombre_categoria + index}
								>
									{' '}
									{a.nombre_categoria}
								</option>
							))}
						</select>{' '}
					</div>
					<label htmlFor="">Añadir sub categoria: </label>
					<input
						type="text"
						className="add-subC-input"
						value={newSubCategory}
						onChange={handleChangeSubCategory}
					/>

					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Subcategorias existentes: </label>
							<select name="" id="">
								<option value="">-</option>
								{subcategories?.map((a) => (
									<option value="" key={a}>
										{a.nombre_subcategoria}
									</option>
								))}
							</select>
						</div>
						<button className="create-menu-delete-btn">
							<AiOutlineDelete className="create-menu-delete-icon" />
						</button>
					</div>
				</div>
				<div>
					<button className="create-menu-add-btn" onClick={handleCreateProdcut}>
						<span></span>
						Añadir nuevo producto{' '}
						<span>
							<MdAddCircle className="create-menu-add-icon" />
						</span>
					</button>
					<div className="create-menu-input">
						<label htmlFor="">Categoria: </label>
						<select
							name="categoria"
							id=""
							value={input.categoria}
							onChange={handleselectCategoryToProd}
						>
							<option value="">-</option>
							{categories?.map((a, index) => (
								<option
									value={a.nombre_categoria}
									key={a.nombre_categoria + index}
								>
									{' '}
									{a.nombre_categoria}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Sub Categoria: </label>
						<select
							name="subcategoria"
							id=""
							onChange={handleselectSubCategory}
							value={input.subcategoria}
						>
							<option value="">-</option>
							{subcategories?.map((a, index) => (
								<option
									value={a.nombre_subcategoria}
									key={a.nombre_subcategoria + index}
								>
									{a.nombre_subcategoria}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Nombre:</label>
						<input
							type="text"
							name="nombre"
							value={input.nombre}
							onChange={handleChange}
						/>
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Precio: $</label>
						<input
							type="number"
							name="precio"
							value={input.precio}
							onChange={handleChange}
						/>
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Imagen:</label>
						<input
							type="file"
							value={input.img}
							name="img"
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="menu-mobile-admin">
				{/* <h1>Nombre empresa</h1>
				<div className="menu-mobile-admin-categories">
					{categories?.map((c, index) => (
						<button
							className="menu-mobile-admin-btn"
							key={c.nombre_categoria + index}
						>
							{c.nombre_categoria}
						</button>
					))}
				</div> */}
				<ClientMenuConfig />
			</div>
		</main>
	);
}
