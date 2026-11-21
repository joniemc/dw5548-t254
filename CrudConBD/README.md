# CrudConBD

API REST sencilla construida con **Node.js**, **Express** y **MySQL** (mediante `mysql2`). Es el primer ejercicio del curso que conecta una API a una base de datos real: expone un endpoint que consulta las categorías almacenadas en la base de datos `T254Fabricante`.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`)
- Servidor MySQL 8 (o compatible, como MariaDB) en ejecución
- Un cliente de MySQL para ejecutar el script SQL (MySQL Workbench, DBeaver o la terminal `mysql`)

## Crear la base de datos

El script [sql/t254Fabricante.sql](sql/t254Fabricante.sql) crea la base de datos, sus tablas y algunos datos de ejemplo.

Desde la terminal:

```bash
mysql -u root -p < sql/t254Fabricante.sql
```

O bien, abre el archivo en MySQL Workbench (u otro cliente) y ejecútalo completo.

El script:

1. Crea la base de datos `T254Fabricante`.
2. Crea las tablas:

   | Tabla        | Columnas                                                                 |
   |--------------|--------------------------------------------------------------------------|
   | `Categoria`  | `Id` (PK, autoincremental), `Nombre`                                     |
   | `Fabricante` | `Id` (PK, autoincremental), `Nombre`                                     |
   | `Producto`   | `Id` (PK), `Nombre`, `Categoria_Id` (FK), `Cantidad`, `Precio`, `Fabricante_Id` (FK) |

   Cada `Producto` pertenece a una `Categoria` y a un `Fabricante` a través de llaves foráneas.
3. Inserta datos de ejemplo: las categorías *Tecnologia* y *Limpieza*, el fabricante *Apple* y el producto *Iphone XIX*.
4. Incluye consultas de práctica vistas en clase (`INNER JOIN`, `LEFT JOIN` y `RIGHT JOIN`).

> **Nota:** el script incluye `CREATE DATABASE`, por lo que fallará si la base de datos ya existe. En ese caso elimínala primero con `DROP DATABASE T254Fabricante;` o ejecuta solo las partes que necesites.

## Configurar la conexión

Los datos de conexión están definidos directamente en [app.js](app.js):

```js
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'R00tP4ssw0rd',
    database: 'T254Fabricante'
});
```

Cambia `user` y `password` por las credenciales de tu servidor MySQL local.

## Ejecutar el proyecto

```bash
cd CrudConBD
npm install
node app.js
```

Si todo está bien, verás en la consola:

```
Servidor escuchando en el http://localhost:3000
Conexión exitosa...
```

Si aparece `Error de conexión a la base de datos...`, revisa que MySQL esté corriendo, que la base de datos exista y que las credenciales sean correctas.

## Endpoints

### `GET /categorias`

Devuelve todas las categorías registradas.

```bash
curl http://localhost:3000/categorias
```

Respuesta exitosa (`200`):

```json
{
  "status": 200,
  "message": "Success",
  "data": [
    { "Id": 1, "Nombre": "Tecnologia" },
    { "Id": 2, "Nombre": "Limpieza" }
  ]
}
```

Respuesta con error (`500`):

```json
{
  "status": 500,
  "message": "Ocurrio un error inesperado, intentalo mas tarde."
}
```

## Resumen del funcionamiento

1. Al iniciar, `app.js` crea un **pool de conexiones** a MySQL con `mysql.createPool`. El pool reutiliza conexiones en lugar de abrir una nueva por cada consulta.
2. Se solicita una conexión de prueba para verificar el acceso a la base de datos y se informa el resultado en la consola.
3. Se registra el middleware `express.json()` para poder leer cuerpos JSON en futuras peticiones (`POST`, `PUT`, etc.).
4. Cuando llega una petición a `GET /categorias`, se ejecuta `SELECT Id, Nombre FROM Categoria` mediante `pool.query`:
   - Si la consulta falla, se responde con estado `500` y un mensaje genérico (el detalle no se expone al cliente).
   - Si tiene éxito, se responde con estado `200` y las filas obtenidas en la propiedad `data`.
5. El servidor queda escuchando en el puerto `3000`.

## Estructura

```
CrudConBD/
├── app.js                  # Servidor Express y conexión a MySQL
├── package.json            # Dependencias (express, mysql2)
└── sql/
    └── t254Fabricante.sql  # Script de creación de la BD y consultas de práctica
```
