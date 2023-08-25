const { response } = require('express');
const pool = require('../database');
const generarJWT = require('../middlerwares/generar-jwt');



const mostrarMenu = async (req, res) => {
  const emailUsuario = req.email
  try {
      const query = 'SELECT * FROM items where email = ?'
    const [rows] = await pool.query(query, [ emailUsuario]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

// Ruta para agregar un elemento
const agregarProducto = async (req, res) => {
  const emailUsuario = req.email
  try {
    const { nombre, categoria, subcategoria, cantidad, precio } = req.body;
    const img_url = req.file ? req.file.path : null;

    const query = 'INSERT INTO items (img, nombre, categoria, subcategoria, cantidad, precio, emailusuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [img_url, nombre, categoria, subcategoria, cantidad, precio, emailUsuario];

    await pool.query(query, values);
    res.sendStatus(201).json({
      message:'Producto agregado correctamente'
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Ruta para actualizar un elemento
const actualizarMenu = async (req, res) => {
  
  const emailUsuario = req.email
  try {
    const { nombre, categoria, subcategoria, cantidad, precio } = req.body;
    const img_url = req.file ? req.file.path : null;
    const id = req.params.id;
      
  
   // Verificar que el elemento pertenezca al usuario autenticado antes de actualizar
  const [itemRows] = await pool.query('SELECT * FROM items WHERE id = ? AND usuario_email = ?', [id, emailUsuario]);
      if (itemRows.length === 0) {
      return res.status(404).json({ message: 'Item not found.' });
      }



    const query = 'UPDATE items SET img = ?, nombre = ?, categoria = ?, subcategoria = ?, cantidad = ?, precio = ? WHERE id = ?';
    const values = [img_url, nombre, categoria, subcategoria, cantidad, precio, id];

    await pool.query(query, values);
    res.sendStatus(200).json({ message: 'producto actualizado correctamente.' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Ruta para eliminar un elemento
const borrarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM items WHERE id = ?', [id]);
    
    res.sendStatus(204).json({ message: 'Producto eliminado correctamente.' });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};



// Ruta GET para mostrar todas las categorías
const mostrarCategorias = async (req, res) => {
const emailUsuario = req.email
const query = 'SELECT * FROM categorias WHERE usuario_email = ?';
try {
    const result = await pool.query(query, [emailUsuario]);
    const categorias = result[0][0]
    res.status(200).json({ categorias})
} catch (error) {
  res.status(500).json({ 
    error: error,
    msg: 'Error en mostrar categorias'
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
  res.status(200).json({pedidos});
} catch (error) {
  res.status(500).json({
    error,
    msg: 'error en mostrar los pedidos'
  })
}

}


//realizar pedido desde el menu
const realizarPedidos = async (req, res) => {
 const mesa = req.params.mesa
 const email = req.params.email
 const {pedido, comentario, nombre} = req.body;

 const query = 'INSERT INTO pedidos (mesa,pedido, comentario, nombre, usuario_email) VALUES (?, ?, ?, ?, ?, ?)';

 try {
   const result = await pool.query(query, [mesa, pedido, comentario, nombre, email]);
    res.status(200).json({
      msg: 'pedido realizado con exito',
    });
 } catch (error) {
   res.status(500).json({
    error,
    msg:'error en realizar el pedido'
   })
 }

}

const liberarMesa = async (req, res) => {
const mesa = req.params.mesa;
const emailUsuario = req.email;

const query = 'DELETE FROM pedidos WHERE mesa = ? AND email = ?'

try {
  const result = await pool.query(query, [mesa, emailUsuario]);
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
  liberarMesa
}
  