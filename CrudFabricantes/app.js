const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(express.json());

function obtenerFabricantes(){
    const data = fs.readFileSync('fabricantes.json', 'utf-8');
    return JSON.parse(data);
}

function guardarFabricante(fabricantes){
    fs.writeFileSync('fabricantes.json',JSON.stringify(fabricantes,null,2));
}

app.get('/fabricantes',(req,res)=>{
    let fabricantes = obtenerFabricantes();

    res.status(200).json({status:200, message:'Success', data: fabricantes});
});

app.post('/fabricantes',(req,res)=>{
    const fabricante = req.body;
    let fabricantes = obtenerFabricantes();

    fabricantes.push(fabricante);
    guardarFabricante(fabricantes);

    res.status(200).json({status:200,message:"Success",data: fabricante});
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});