const pool = require('../connection');

const accounts = {};


// verificamos las cuentas que tiene registrada
accounts.view = async(req, res) => {
    const total = await pool.query('SELECT * FROM cuentas_clientes WHERE cedula_cliente =?', [req.user.cedula]);
    //console.log('total de cuentas: ', total);
    //res.send('Aqui va el total de cuenas...');
    res.render('routes/accounts', { accounts_client: total });
}

// ahora realizaremos los movimientos de cuenta






module.exports = accounts;