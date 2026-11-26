const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: 'R00tP4ssw0rd',
    database: 'T254Fabricante'
});

pool.getConnection((error, conexion)=>{
    if(error){
        console.log("Error de conexión a la base de datos...");
    }else{
        console.log("Conexión exitosa...");
    }
});

app.use(express.json());

function validarCategoriaExistente(nombre) {

    const sql = 'SELECT Id, Nombre FROM Categoria WHERE Nombre = ?';
    return new Promise((resolve) => {
        pool.query(sql, [nombre], (err, results) => {
            if (err) {
                console.log("Ocurrio un error en la consulta...");
                resolve(-1);
            } else {
                if (results.length > 0) {
                    console.log(`Entro en la validación del nombre, hay ${results.length} registros`);
                    resolve(1);
                }
                else {
                    resolve(0);
                }
            }
        });
    });

}

app.get('/categorias',(req, res)=>{
    const sql = 'SELECT Id, Nombre FROM Categoria';
    
    pool.query(sql,(err, results)=>{
        if(err){
            console.log("Ocurrio un error en la consulta...");
            res.status(500).json({status:500,message:"Ocurrio un error inesperado, intentalo mas tarde."});
        }else{
            res.status(200).json({status:200,message:"Success",data:results});
        }
    });
});

app.post('/categorias',async (req, res)=>{
    const categoria = req.body;

    const sql = "INSERT INTO Categoria (Nombre) VALUES(?)";

    if(!categoria.Nombre){
        res.status(400).json({status:400,message:"El campo Nombre es obligatorio."});
    }

    let resultado = await validarCategoriaExistente(categoria.Nombre);

    switch(resultado){
        case -1:
            return res.status(500).json({status:500,message:"Ocurrio un error inesperado, intentalo mas tarde."});
        case 1:
            console.log('Hola Inicio');
            return res.status(400).json({status:400,message:"La categoria ya existe en el sistema."});
        default:
            console.log('Hola Inicio DEFAULT');
            pool.query(sql,[categoria.Nombre],(err, results)=>{
                if(err){
                    console.log("Ocurrio un error en la consulta...");
                    return res.status(500).json({status:500,message:"Ocurrio un error inesperado, intentalo mas tarde."});
                }
                else{
                    categoria.Id = results.insertId;
                    return res.status(200).json({status:200,message:"Success",data:categoria});
                }
            });
            break;

    }

});

app.put('/categorias/:id',async (req, res)=>{
    const categoria = req.body;
    categoria.Id = req.params.id;

    if(!categoria.Nombre || !categoria.Id){
        return res.status(400).json({status:400,message:"El Id y el Nombre son requeridos para la actualización..."});
    }
    const sql = 'UPDATE Categoria SET Nombre = ? WHERE Id= ?';

    let nombreExiste = await validarCategoriaExistente(categoria.Nombre);

    if (nombreExiste === 0) {
        pool.query(sql, [categoria.Nombre, categoria.Id], (err, results) => {
            if (err) {
                res.status(500).json({ status: 500, message: 'Ocurrio un error en la consulta..' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ status: 404, message: 'Categoria no encontrada..' });
            } else {
                res.status(200).json({ status: 200, message: 'Registro actualizado con exito...', data: categoria });
            }
        });
    }else if(nombreExiste === 1){
        res.status(400).json({ status: 400, message: 'El nombre del registro que desea actualizar ya existe...' });
    }else{
        res.status(400).json({ status: 400, message: 'Ocurrio un error, intentelo mas tarde...' });
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el http://localhost:${PORT}`);
});