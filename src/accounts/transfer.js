const pool = require('../connection');

const transfers = {};

transfers.view = async(req, res) => {
    const { numero_cuenta } = req.params;
    const data = await pool.query('SELECT *FROM cuentas_clientes WHERE numero_cuenta=?', [numero_cuenta]);
    res.render('transfer/transfer', { valores: data });
}

transfers.success = async(req, res) => {
    const data = req.body;
    const id_emisor = await pool.query('SELECT id FROM cuentas_clientes WHERE numero_cuenta =?', [req.body.account_emisor]);
    const cantidad_actual = await pool.query('SELECT id, valores_cuenta FROM cuentas_clientes WHERE numero_cuenta =?', [req.body.account_receptor]);
    let plus = cantidad_actual[0].valores_cuenta;
    const minimo = (req.body.valores) * 0.75;
    let enviar = parseInt(data.cantidad_enviar);
    const resto = parseInt(data.valores) - enviar;
    const emisor = {
        valores_cuenta: req.body.valores - enviar
    };
    const receptor = {
        valores_cuenta: (enviar + plus)
    };
    if (enviar <= minimo) {

        const insert_data = {
            numero_cuenta: req.body.account_emisor,
            descripcion: req.body.descripcion,
            operacion: req.body.operacion,
            valores: enviar,
            diferencia: resto
        };
        await pool.query('UPDATE cuentas_clientes SET ? WHERE ID=?', [emisor, id_emisor[0].id]);
        await pool.query('UPDATE cuentas_clientes SET ? WHERE ID=?', [receptor, cantidad_actual[0].id]);
        await pool.query('INSERT INTO estado_cuentas set?', [insert_data]);
        req.flash('success', 'Proceso de acreditacion exitoso. ');
        //res.send('procesando');
        res.redirect('/main/movements');

    } else {
        req.flash('messagge', 'cantidad a enviar sobrepasa el limite establecido.');
        res.redirect('/main/movements');
    }
}


module.exports = transfers;