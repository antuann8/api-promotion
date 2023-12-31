// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// data
const { htmlBlocks } = require('./creator.js');


// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

// start

module.exports = (server) => {

    server.post(`${config.API_PATH}/creator/clear/all`, async (req, res, next) => {
        try {
            htmlBlocks.length = 0;

            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    server.post(`${config.API_PATH}/creator/clear/one`, async (req, res, next) => {
        try {
            const index = req.body;

            htmlBlocks.splice(index, 1);
            console.log(index);
            // Отправка HTML-страницы в ответе
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });
};