const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

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

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el http://localhost:${PORT}`);
});