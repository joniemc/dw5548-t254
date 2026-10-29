const express = require('express');
const app = express();
const PORT = 3000;

app.get('/ejemplo-parametros/:nombre', (req, res)=>{
    const nombre = req.params.nombre;

    res.json({status:200,message:'success',data:nombre});
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});