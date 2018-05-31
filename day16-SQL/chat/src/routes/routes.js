const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const knex = require('./../db/knex_db_connection.js');

router.use(express.static(path.join(path.join(__dirname, '../../public'))));

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

router.get('/short-history', (req, res) => {
    knex.select().from('mhistory').orderBy('id', 'desc').limit(10).then((records) => {
        res.send(records);
    });
});

router.post('/next-messages', jsonParser, (req, res) => {
    let lastMsgId = req.body.msgId;
    knex.select().from('mhistory').where('id', '<', lastMsgId).orderBy('id', 'desc').limit(10).then((records) => {
        res.send(records);
    });
});

module.exports = router;