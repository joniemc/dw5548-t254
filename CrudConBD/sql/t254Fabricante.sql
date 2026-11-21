CREATE DATABASE T254Fabricante;

use T254Fabricante;

CREATE TABLE `Categoria` (
  `Id` INT AUTO_INCREMENT NOT NULL,
  `Nombre` VARCHAR(35),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Fabricante` (
  `Id` INT AUTO_INCREMENT NOT NULL,
  `Nombre` VARCHAR(35),
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Producto` (
  `Id` INT AUTO_INCREMENT NOT NULL,
  `Nombre` VARCHAR(35),
  `Categoria_Id` INT,
  `Cantidad` INT,
  `Precio` DOUBLE,
  `Fabricante_Id` INT,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`Categoria_Id`)
      REFERENCES `Categoria`(`Id`),
  FOREIGN KEY (`Fabricante_Id`)
      REFERENCES `Fabricante`(`Id`)
);


INSERT INTO Categoria (Nombre) VALUES('Tecnologia');
INSERT INTO Categoria (Nombre) VALUES('Limpieza');
INSERT INTO Fabricante (Nombre) VALUES('Apple');
INSERT INTO Producto (Nombre, Categoria_Id,Cantidad, Precio, Fabricante_Id) 
VALUES("Iphone XIX", 1, 10, 2500, 1); 

SELECT c.Nombre as Categoria,
		f.Nombre as Fabricante,
		p.Cantidad,
		p.Nombre as Producto,
		p.Precio
FROM Producto p
INNER JOIN Categoria c
ON(p.Categoria_Id = c.Id)
INNER JOIN Fabricante f
ON(p.Fabricante_Id = f.Id); 

SELECT c.Nombre as Categoria,
		p.Cantidad,
		p.Nombre as Producto,
		p.Precio
FROM Categoria c
LEFT JOIN Producto p
ON(c.Id = p.Categoria_Id);

SELECT c.Nombre as Categoria,
		p.Cantidad,
		p.Nombre as Producto,
		p.Precio
FROM Producto p
RIGHT JOIN Categoria c
ON(p.Categoria_Id = c.Id);

SELECT * FROM Categoria;
