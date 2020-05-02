const express = require('express');
const pool = require('../connection');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();
const { RandomNumber } = require('../lib/random');
const { ItsNotLogged, Itslogged } = require('../lib/auth');

const { create_name } = require('../personal/method');
const accounts = require('../accounts/accounts');
const trans = require('../accounts/movements');
const transfers = require('../accounts/transfer');
const request = require('request');
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');
//pdfMake.vfs = vfsFonts.pdfMake.vfs;

// La página principal
router.get('/index', Itslogged, async(req, res) => {
    //res.send('is working...');
    res.render('routes/index');
});


// example for response with json object
router.get('/json', Itslogged, (req, res) => {
    res.json({
        messagge: 'Hola Arturon'
    });
});




// Views templates about accounts per client
router.get('/accounts', accounts.view);

router.get('/movements', trans.movements);

router.get('/movements/:numero_cuenta', trans.verify);

router.get('/selected/:numero_cuenta', trans.selected);

router.post('/selected', trans.commit);

router.get('/success', (req, res) => {
    res.render('routes/success');
});


// fetch record of account statement
router.get('/filtro', async(req, res) => {
    res.render('routes/record');
})



router.post('/filtro', async(req, res, next) => {
    const { record } = req.body;

    const fetch_result = await pool.query('SELECT * FROM estado_cuentas WHERE fecha BETWEEN ? AND ?', [record, record + ' ' + '23:59:59']);
    console.log('fetch_result', fetch_result);

});

router.post('/imprimir', async(req, res) => {
    const cuerpo = req.body;
    console.log('cuerpo del data: ', cuerpo);
});


router.get('/reload', async(req, res) => {
    res.render('personal/load');
});


router.post('/reload', async(req, res) => {

    const body = req.body;
    const consult_data = await pool.query('SELECT  id,valores_cuenta FROM cuentas_clientes WHERE numero_cuenta =?', [body.account_number]);

    if (consult_data.length > 0) {
        const codigo = await pool.query('SELECT cantidad FROM loads_per_account WHERE codigo =?', [body.codigo_recarga]);
        if (codigo.length > 0) {
            const valor = {
                valores_cuenta: parseInt(codigo[0].cantidad) + parseInt(consult_data[0].valores_cuenta)
            };

            await pool.query('UPDATE cuentas_clientes SET ? WHERE id =?', [valor, consult_data[0].id]); // aqui haremos la recarga de los valores dentro de la tabla de las cuentas
            await pool.query('DELETE FROM loads_per_account WHERE codigo =?', [body.codigo_recarga]); // para que el codigo no se pueda reutilizar
            req.flash('success', 'Se acreditó correctamente a su cuenta.');
            res.redirect('/main/accounts');
        } else {
            req.flash('messagge', 'codigo incorrecto o ya fue utilizado');
            res.redirect('/main/reload');
        }
    } else {
        req.flash('messagge', 'El número de cuenta es incorrecto');
        res.redirect('/main/reload');
    }
});


// Aqui realizamos los movimientos de cuenta a cuenta.
router.get('/transfer/:numero_cuenta', transfers.view);
router.post('/transfer', transfers.success);



// To edit profile
router.get('/edit/:cedula', async(req, res) => {
    const { cedula } = req.params;
    const edit_user = await pool.query('SELECT * FROM cuentas WHERE cedula =?', [cedula]);
    res.render('personal/edit', { accounts_cliente: edit_user });
});

router.post('/edit', async(req, res) => {
    const datos = req.body;
    const new_name = RandomNumber();
    console.log('foto: ', req.file);
    const target = req.file.path;
    const extension = path.extname(req.file.originalname).toLocaleLowerCase();
    const new_target = path.resolve(`src/public/img_users/user/${new_name}${extension}`);
    console.log('extension: ', extension)
    console.log('el cuerpo del dato: ', datos);
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
        fs.rename(target, new_target);
    }
    const new_datos = {
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        foto: new_name + extension,
        ciudad: datos.ciudad,
        estado: datos.estado,
        direccion: datos.direccion,
        telefono: datos.telefono,
        email: datos.email
    };
    await pool.query('UPDATE cuentas SET? WHERE cedula =?', [new_datos, datos.cedula]);
    req.flash('success', 'Datos actualizados correctamente');
    res.redirect('/main/movements');
});

module.exports = router;