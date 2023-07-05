// helpers
const responses = require('../helpers/responses');

// data
const { htmlBlocks } = require('./creator.js');

// config
const config = require('../config');

// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const cheerio = require('cheerio');

// start
module.exports = (server) => {

    server.get(`${config.API_PATH}/creator/getCountBlocks`, async (req, res, next) => {
        try {
            let count = htmlBlocks.length;

            res.send(count.toString());
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

};