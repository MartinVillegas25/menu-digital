CREATE DATABASE IF NOT EXISTS menudb;

USE menudb;

CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
)

CREATE TABLE subcripcion (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    local VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    cp INT(7),
    subcripcion VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
)

DESCRIBE usuarios;

