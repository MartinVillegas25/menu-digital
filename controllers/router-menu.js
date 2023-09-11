const path = require('path');
const fs   = require('fs');
const { response } = require('express');

const pool = require('../database');
const generarJWT = require('../middlerwares/generar-jwt');


const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );




const mostrarMenu = async (req, res = response) => {
  const emailUsuario = req.email;
  try {
    const query = `
    SELECT * FROM items
    WHERE emailusuario = ?
    `;

    const [rows] = await pool.query(query, [emailUsuario]);
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Ruta para agregar un elemento
const agregarProducto = async (req, res) => {
  const emailUsuario = req.email
  try {
    const { nombre, categoria, subcategoria, precio } = req.body;
    
    //agregar imagen a cloudinary para obterner url
  
    const { tempFilePath } = req.files.img
    
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
    const img_url = secure_url;
    
    const query = 'INSERT INTO items (img, nombre, categoria, subcategoria, precio, emailusuario) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [img_url, nombre, categoria, subcategoria, precio, emailUsuario];
    
    await pool.query(query, values);
    res.Status(201).json({
      message:'Producto agregado correctamente'
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//ruta para agregar categoria

const crearCategoria = async (req, res) => {
  const emailUsuario = req.email
  const {nombre_categoria} = req.body;
try{
// Primero, verifica si ya existe una categoría con el mismo nombre para el usuario dado
const categoriaExistente = 'SELECT id_categoria FROM categorias WHERE nombre_categoria = ? AND emailusuario = ?';
const categoriaExistenteValues = [nombre_categoria, emailUsuario];
const [categoriaExistenteResult] = await pool.query(categoriaExistente, categoriaExistenteValues);


if (categoriaExistenteResult.length > 0) {
  return res.status(400).json({ message: 'La categoría ya existe para este usuario.' });
}



//creo la categoria
  const query = 'INSERT INTO categorias (nombre_categoria, emailusuario) VALUES (?, ?)';
  const values = [nombre_categoria, emailUsuario];

  await pool.query(query, values);
  res.status(201).json({
    message:'Categoria agregado correctamente'
  });
    } catch (err) {
      res.status(500).json({ error: err });
    }

}

//ruta para agregar subcategorias

const crearSubCategoria = async (req, res) => {
  const emailUsuario = req.email;
  const { subcategoria, categoria } = req.body;

  try {
    // Verifica si la categoría especificada existe para el usuario
    const categoriaExistenteQuery = 'SELECT id_categoria FROM categorias WHERE nombre_categoria = ? AND emailusuario = ?';
    const categoriaExistenteValues = [categoria, emailUsuario];
    const categoriaExistenteResult = await pool.query(categoriaExistenteQuery, categoriaExistenteValues);
    const idCategoria = categoriaExistenteResult[0][0].id_categoria;

    if (categoriaExistenteResult.length === 0) {
      return res.status(400).json({ message: 'La categoría especificada no existe para este usuario.' });
    }

    // Inserta la nueva subcategoría en la base de datos
    const insertQuery = 'INSERT INTO subcategorias (nombre_subcategoria, id_categoria, emailusuario) VALUES (?, ?, ?)';
    const insertValues = [subcategoria, idCategoria,emailUsuario ];

    await pool.query(insertQuery, insertValues);
    res.status(201).json({
      message: 'Subcategoría agregada correctamente'
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }

}

// Ruta para actualizar un elemento
const actualizarMenu = async (req, res) => {
  
  const dataActualizada= req.body;
  const usuarioActualizado = req.email 
  
  try {
    const id = req.query.id;
    

    
    
  
   // Verificar que el elemento pertenezca al usuario autenticado antes de actualizar
  const itemRows = await pool.query('SELECT * FROM items WHERE id = ? AND emailusuario = ?', [id, usuarioActualizado]);
  
      if (itemRows.length === 0) {
      return res.status(404).json({ message: 'Item not found.' });
      }
  
   
  // //BORRAR LA IMAGEN DE CLOUDINARY Y REEMPLEZARLA CON LA NUEVA
  let {img} = dataActualizada

 if(img){
   
   const urlImagenVIeja = itemRows[0][0].img;
   
   const [ public_id ] = urlImagenVIeja.split('.');
         cloudinary.uploader.destroy( public_id );
 
   //agregar imagen a cloudinary para obterner url
   const { tempFilePath } = req.files.img
   const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
 
   img = secure_url;

 }

    let sql = `UPDATE items SET`;
    let values = [];
    for (const key in dataActualizada) {
    if (key !== usuarioActualizado && dataActualizada.hasOwnProperty(key)) {
        sql += ` ${key} = ?, `;
        console.log(sql);
        values.push(dataActualizada[key]);
        console.log("values", values);
    }
    }
    sql = sql.slice(0, -2);
    sql += ` WHERE id = ?`; 
    values.push(id); 
    
    const result= await pool.query(sql, values);
    console.log(result);
    res.status(200).json({message: 'producto actualizado'});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Ruta para eliminar un elemento
const borrarProducto = async (req, res) => {
  try {
    const id = req.query.id;
    await pool.query('DELETE FROM items WHERE id = ?', [id]);
    
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (err) {
    res.status(500).json({err});
  }
};



// Ruta GET para mostrar todas las categorías
const mostrarCategorias = async (req, res) => {
const emailUsuario = req.email
const query = 'SELECT nombre_categoria FROM categorias WHERE emailusuario = ?';
try {
    const result = await pool.query(query, [emailUsuario]);
    const categorias = result[0];

    res.status(200).json({ categorias})
} catch (error) {
  res.status(500).json({ 
    error: error,
    msg: 'Error en mostrar categorias'
   });
}

};


// Ruta GET para mostrar todas las subcategorías
const mostrarsubCategorias = async (req, res) => {
	const emailUsuario = req.email;
	const categoria = req.query.categoria;

	const categoriasquery =
		'SELECT id_categoria FROM categorias WHERE emailusuario = ? AND nombre_categoria= ?';
	const querysubcategoria =
		'SELECT nombre_subcategoria FROM subcategorias WHERE emailusuario = ? AND id_categoria = ?';
	try {
		// primero obtengo el id de la categoria
		const resultCateroria = await pool.query(categoriasquery, [
			emailUsuario,
			categoria
		]);
		const categoriaSeleccionada = resultCateroria[0][0];

		// extraigo el id de la categoria
		const idCategoria = categoriaSeleccionada.id_categoria;

		const resultSubCategoria = await pool.query(querysubcategoria, [
			emailUsuario,
			idCategoria
		]);
		const subcategorias = resultSubCategoria[0];
		console.log(subcategorias);

		res.status(200).json({ subcategorias });
	} catch (error) {
		res.status(500).json({
			error: error,
			msg: 'Error en mostrar subcategorias'
		});
	}
};
//ruta mostrar pedidos

const mostrarPedidos = async (req, res) => {
const emailUsuario = req.email

const query = 'SELECT * FROM pedidos WHERE usuario_email = ?';
try {
  const result = await pool.query(query, [emailUsuario]);
  const pedidos = result[0][0];
  res.status(200).json({
    pedidos
  });
} catch (error) {
  res.status(500).json({
    error,
    msg: 'error en mostrar los pedidos'
  })
}

}


//realizar pedido desde el menu
const realizarPedidos = async (req, res) => {
  const email = req.params.email
 const mesa = req.params.mesa
 const {pedido, comentarios, nombre, total} = req.body;

 const query = 'INSERT INTO pedidos (mesa,pedido, comentarios, nombre, total, usuario_email) VALUES (?, ?, ?, ?, ?, ?)';

 try {
   const result = await pool.query(query, [mesa, pedido, comentarios, nombre,total, email]);
    res.status(200).json({
      msg: 'pedido realizado con exito',
      pedidos: result[0][0]
    });
 } catch (error) {
   res.status(500).json({
    error,
    msg:'error en realizar el pedido'
   })
 }

}

const liberarPedido = async (req, res) => {
const {mesa, nombre} = req.params;
const emailUsuario = req.email;


const query = 'DELETE FROM pedidos WHERE mesa = ? AND usuario_email = ? AND nombre = ?'

try {
  const result = await pool.query(query, [mesa, emailUsuario, nombre]);
  res.status(200).json({
    msg: `pedido de la mesa ${mesa} ha sido borrado`    
  })
} catch (error) {
    res.status(500).json({
      error,
      msg:'error en borrar pedido'
    })
}
}

module.exports ={
  mostrarMenu,
  agregarProducto,
  actualizarMenu,
  borrarProducto,
  mostrarCategorias,
  mostrarPedidos,
  realizarPedidos,
  liberarPedido,
  crearCategoria,
  crearSubCategoria,
  mostrarsubCategorias
}
  