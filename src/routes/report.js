const express = require('express');
const router = express.Router();
const request = require('request');
//const client = require('jsreport-client')('http://localhost:3001', 'arturo', 'arturo');

router.get('/', (req, res, next) => {
    /*client.render({
            template: { content: 'Hwllo world', recipe: 'chrome-pdf', engine: 'handlebars' }
        }).then((response) => response.pipe(res))
        .catch(next)*/

});

module.exports = router;