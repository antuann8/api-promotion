// helpers
const responses = require('../helpers/responses');

// data
const { htmlBlocks } = require('./creator.js');
const replaceWithTemplate = require('./../controllers/replaceWithTemplate');

// config
const config = require('../config');

// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const fetch = require("node-fetch-npm");

// start

module.exports = (server) => {

    server.post(`${config.API_PATH}/template/params`, async (req, res, next) => {
        try {

            const templates = req.body;

            templates.map((template) => {
                // console.log(`Мой индекс : ${template.index} , Моё значение : ${template.value}`);

            })

            res.status(200);
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    // server.get(`${config.API_PATH}/template/get`, async (req, res, next) => {
    //     try {
    //         const filePath = path.join(__dirname, '../template/letter.ejs');
    //         const fileContent = await readFile(filePath);
    //
    //         const regex = /{([^}]+)}/g;
    //
    //         if(regex.test(fileContent)) {
    //             fileContent = replaceWithTemplate(fileContent, regex);
    //         }
    //
    //         // console.log(text);
    //         res.setHeader('Content-Type', 'text/html');
    //         res.send(fileContent);
    //     } catch (err) {
    //         console.log(666, err);
    //         res.status(500).send('Internal Server Error');
    //         next();
    //     }
    // });

    server.post(`${config.API_PATH}/template/create`, async (req, res, next) => {
        try {
            let html = req.body.html;

            // console.log(html);

            const regex = /{([^}]+)}/g;

            if(regex.test(html)) {
                html = replaceWithTemplate(html, regex);
            }
            // Получаю в удобном формате
            console.log(html);
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    function readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    module.exports = { htmlBlocks };
};