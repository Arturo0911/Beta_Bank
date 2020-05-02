// this snipt is for do any movments with account


const pool = require('../connection');
const trans = {};

trans.movements = async(req, res) => {
    const movements = await pool.query('SELECT * FROM cuentas_clientes WHERE cedula_cliente =?', [req.user.cedula]);
    res.render('routes/movements', { movimientos: movements });
}

trans.verify = async(req, res) => {
    const { numero_cuenta } = req.params;
    console.log('numero de cuenta seleccionado: ', numero_cuenta)
    const data = await pool.query('SELECT * FROM cuentas_clientes WHERE numero_cuenta =?', [numero_cuenta]);
    console.log('aqui va la data: ', data)
}

trans.selected = async(req, res) => {
    const { numero_cuenta } = req.params
    const resultado_select_account = await pool.query('SELECT * FROM cuentas_clientes WHERE numero_cuenta =?', [numero_cuenta]);
    res.render('routes/former', { cuentas: resultado_select_account });
}


trans.commit = async(req, res) => {
    const data = req.body;
    // para realizar el update en la tabla original de el valor que queda

    const array_cuentas = await pool.query('SELECT id FROM cuentas_clientes WHERE numero_cuenta =?', [data.numero_cuenta]);
    const resultado_select_account = await pool.query('SELECT * FROM cuentas_clientes WHERE numero_cuenta =?', [data.numero_cuenta]);
    const values = await pool.query('SELECT valores_cuenta FROM cuentas_clientes WHERE numero_cuenta=?', [data.numero_cuenta]);
    let account_values = values[0].valores_cuenta;
    const minimo = (account_values) * (0.75);

    const dif = account_values - req.body.valores;


    if (data.valores >= minimo) {
        req.flash('messagge', 'el valor de la cuenta es menor por el margen permitido');
        //console.log('el valor de la cuenta es menor por el margen permitido');
        res.render('routes/former', { cuentas: resultado_select_account });
    } else {
        const callback_to_update = {
            valores_cuenta: dif
        };
        const callback_to_mysql = {
            numero_cuenta: req.body.numero_cuenta,
            descripcion: req.body.descripcion,
            operacion: req.body.operacion,
            valores: req.body.valores,
            diferencia: dif
        };
        await pool.query('UPDATE cuentas_clientes SET ? WHERE ID=?', [callback_to_update, array_cuentas[0].id]);
        await pool.query('INSERT INTO estado_cuentas SET?', [callback_to_mysql]);
        req.flash('success', 'transacción en proceso de verificación');
        res.redirect('/main/success');
    }
}


module.exports = trans;