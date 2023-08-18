const { response } = require('express');
const pool = require('../database');
const generarJWT = require('../middlerwares/generar-jwt');



const mostrarMenu = async (req, res) => {
    const emailUsuario = req.email
    try {
        const query = 'SELECT * FROM items where email = ?'
      const [rows] = await pool.query(query, [ emailUsuario]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.status(500).json({ error: err.message });
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
      res.status(500).json({ error: err.message });
    }
  };
  
  // Ruta para eliminar un elemento
  const borrarProducto = async (req, res) => {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM items WHERE id = ?', [id]);
      res.sendStatus(204).json({ message: 'Producto eliminado correctamente.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports ={
    mostrarMenu,
    agregarProducto,
    actualizarMenu,
    borrarProducto
  }

  