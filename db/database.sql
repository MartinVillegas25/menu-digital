CREATE DATABASE IF NOT EXISTS menudb;

USE menudb;

CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
)


DESCRIBE usuarios;

