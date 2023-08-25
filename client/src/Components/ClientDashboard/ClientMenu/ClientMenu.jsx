import './ClientMenu.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
export default function ClientMenu() {
	const categoria = [
		'categoria1',
		'categoria2',
		'categoria3',
		'categoria4',
		'categoria5'
	];

	const subcategoria = [
		'subcategoria1',
		'subcategoria2',
		'subcategoria3',
		'subcategoria4',
		'subcategoria5'
	];
	return (
		<main className="client-create-menu-container">
			<div className="create-menu-container">
				<h2 className="create-menu-tittle">Creacion del menu</h2>
				<h4>Titulo del menu:</h4>
				<div>
					<button className="create-menu-add-btn">
						<span></span>
						Añadir nueva categoria{' '}
						<span>
							<MdAddCircle className="create-menu-add-icon" />
						</span>
					</button>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<input type="text" />
					</div>
					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Categorias existentes: </label>
							<select name="" id="">
								<option value="">-</option>
								{categoria.map((a) => (
									<option value="" key={a}>
										{a}
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
					<button className="create-menu-add-btn">
						<span></span>
						Añadir sub categoria
						<span>
							<MdAddCircle className="create-menu-add-icon" />
						</span>
					</button>
					<div className="create-menu-input">
						<label htmlFor="">Titulo de la categoria: </label>
						<select name="" id="">
							<option value="">-</option>
							{categoria.map((a) => (
								<option value="" key={a}>
									{a}
								</option>
							))}
						</select>{' '}
					</div>
					<label htmlFor="">Añadir sub categoria: </label>
					<input type="text" className="add-subC-input" />

					<div className="create-menu-input create-menu-select">
						<div>
							<label htmlFor="">Subategorias existentes: </label>
							<select name="" id="">
								<option value="">-</option>
								{subcategoria.map((a) => (
									<option value="" key={a}>
										{a}
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
					<button className="create-menu-add-btn">
						<span></span>
						Añadir nuevo elemento{' '}
						<span>
							<MdAddCircle className="create-menu-add-icon" />
						</span>
					</button>
					<div className="create-menu-input">
						<label htmlFor="">Categoria: </label>
						<select name="" id="">
							<option value="">-</option>
							{categoria.map((a) => (
								<option value="" key={a}>
									{a}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Sub Categoria: </label>
						<select name="" id="">
							<option value="">-</option>
							{subcategoria.map((a) => (
								<option value="" key={a}>
									{a}
								</option>
							))}
						</select>{' '}
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Nombre:</label>
						<input type="text" />
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Precio: $</label>
						<input type="number" />
					</div>
					<div className="create-menu-input">
						<label htmlFor="">Imagen:</label>
						<input type="text" />
					</div>
				</div>
			</div>
			<div className="menu-mobile-admin">
				<h1>Nombre empresa</h1>
				<div className="menu-mobile-admin-categories">
					{categoria.map((c) => (
						<button className="menu-mobile-admin-btn" key={c}>
							{c}
						</button>
					))}
				</div>
			</div>
		</main>
	);
}
