CREATE DATABASE IF NOT EXISTS menudb;

USE menudb;



CREATE TABLE usuarios (
  id INT(11) NOT NULL AUTO_INCREMENT,
  img VARCHAR(100) NULL,
  name VARCHAR(100) NOT NULL,
  storeName VARCHAR(100) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(200) NOT NULL,
  address VARCHAR(50) NOT NULL,
  cp INT(7) NOT NULL,
  plan VARCHAR(15) NOT NULL,
  status boolean DEFAULT TRUE NULL,
  date VARCHAR(50) NOT NULL,
  telefono INT NOT NULL,
  pais varchar(10) NULL ,
  localidad varchar(20) NULL,
  tipo varchar(20) NOT NULL,
  comentario varchar(200) NULL;
  PRIMARY KEY (id)
);


ALTER TABLE usuarios
ADD telefono INT NOT NULL,
ADD pais varchar(10) NULL ,
ADD localidad varchar(20) NULL,
ADD tipo varchar(20) NOT NULL,
ADD comentario varchar(200) NULL;

CREATE TABLE planes (
  basic VARCHAR(20) NULL,
  standard INT(6) NOT NULL,
  premium INT(6) NOT NULL,

)


ALTER TABLE planes
ADD basic varchar(20) NULL


CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  img VARCHAR(200) NULL,
  nombre VARCHAR(60) NOT NULL,
  id_categoria INT NOT NULL,
  id_subcategoria INT NOT NULL,
  cantidad INT NULL,
  precio INT NOT NULL,
  emailusuario VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
  FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria);
);



CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY,
    emailusuario VARCHAR(100) NOT NULL,
    nombre_categoria VARCHAR(50),
);

CREATE TABLE subcategorias (
    id_subcategoria INT PRIMARY KEY,
    nombre_subcategoria VARCHAR(50),
    id_categoria INT,
    emailusuario VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
);



DESCRIBE planes;

DESCRIBE usuarios;

