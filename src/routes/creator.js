// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const cheerio = require('cheerio');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

// start
module.exports = (server) => {
    const htmlBlocks = [];

    // Получение пустого шаблона
    server.get(`${config.API_PATH}/creator/get`, async (req, res, next) => {
        try {
            // Путь к EJS-файлу
            const ejsFilePath = path.join(__dirname, '../template/letter.ejs');

            // Рендеринг EJS-шаблона с передачей массива htmlBlocks
            const renderedContent = await ejs.renderFile(ejsFilePath, { htmlBlocks });

            // Отправка HTML-страницы в ответе
            res.setHeader('Content-Type', 'text/html');
            res.send(renderedContent);
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });


    server.post(`${config.API_PATH}/creator/add`, async (req, res, next) => {
        try {

            const backcolor = req.body.backcolor; // start backcolor
            const fontFamily = req.body.fontFamily; // start fontFamily
            const fontSize = req.body.fontSize;

            // Отрендерить HTML-блок с использованием EJS
            const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
            const renderedBlock = await ejs.renderFile(blockTemplatePath, { backcolor, fontFamily, fontSize, ...req.body });

            // Добавление нового блока HTML-кода в массив
            htmlBlocks.push(renderedBlock);

            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    module.exports = { htmlBlocks };
};


