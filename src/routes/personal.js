const express = require('express');
const pool = require('./autenticacion');
const { create_name } = require('../personal/method');

const path = require('path');
const fs = require('fs-extra');
const router = express.Router();
const { RandomNumber } = require('../lib/random');
const { ItsNotLogged, Itslogged } = require('../lib/auth');

router.get('/test', async(req, res) => {
    res.send('página del personal');
});

router.get('/add', (req, res) => {
    res.render('routes/createuser');
});

router.post('/add', async(req, res) => {
    const nombre_img = RandomNumber();
    const extension = path.extname(req.file.originalname).toLocaleLowerCase(); // la extension de los archivos tipo png, jpg, jpeg, gif pero todos en minusculas
    const Path_img = req.file.path; // lugar original de almacenamiento de las imagenes, previamente configurado en index.js
    console.log('el nombre al azar que le daremos: ', nombre_img);
    const new_target = path.resolve(`src/public/img_users/user/${nombre_img}${extension}`);
    const Nfoto = nombre_img + extension;
    const data = {
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        foto: Nfoto,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
    };
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
        fs.rename(Path_img, new_target);
    }
    //console.log('esta es la data que vamos a almacenar en la base de datos: ', data);
    await pool.query('INSERT INTO cuentas set?', [data]);
    req.flash('success', 'Datos guardados correctamente');
    res.redirect('/auth/userlog');
});



module.exports = router;