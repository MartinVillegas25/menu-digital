CREATE DATABASE IF NOT EXISTS menudb;

USE menudb;



CREATE TABLE usuarios (
  id INT(11) NOT NULL AUTO_INCREMENT,
  img VARCHAR(100),
  name VARCHAR(100) NOT NULL,
  storeName VARCHAR(100) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(200) NOT NULL,
  address VARCHAR(50) NOT NULL,
  cp INT(7) NOT NULL,
  basic boolean,
  standard boolean,
  premium boolean,
  date VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


DESCRIBE usuarios;

