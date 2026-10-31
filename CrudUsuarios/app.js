const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [];

app.get('/usuarios',(req, res)=>{
    res.json({status:200,message:"success",data:usuarios});
});

app.get('/usuarios/:correo',(req, res)=>{
    const correo = req.params.correo;

    let isUser = false;
    let usuario;
    usuarios.forEach(registro => {
        if(registro.correo === correo){
            isUser = true;
            usuario = registro;
        }    
    });

    if(isUser){
        res.status(200).json({status:200,message:"success",data:usuario});
    }else{
        res.status(404).json({status:404,message:"No se encontraron registros..."});
    }

});

app.post('/usuarios', (req, res)=>{
    const usuario = req.body;

    usuarios.push(usuario);

    res.json({status:200,message:"success",data:usuario});

});

app.put('/usuarios/:correo',(req, res)=>{
    const correo = req.params.correo;
    const usuario = req.body;

    if(!correo){
        res.status(400).json({status:400,message:"No se puede procesar su solicitud, el correo es requerido..."});
    }

    
    if(usuarios.length > 0){

        let isUser = false;
        
        usuarios.forEach(registro => {
            if(registro.correo === correo){
                isUser = true;
                registro.nombre = usuario.nombre;
                registro.edad = usuario.edad;
            }    
        });

        if(isUser){
            usuario.correo = correo;
            res.status(201).json({status:201,message:"success",data:usuario});
        }else{
            res.status(404).json({status:404,message:"No se encontraron registros..."});
        }
    }
    else{
        res.status(404).json({status:404,message:"No se encontraron registros..."});
    }

});

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});