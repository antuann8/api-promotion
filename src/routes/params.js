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

// start

module.exports = (server) => {

    server.post(`${config.API_PATH}/creator/change/params`, async (req, res, next) => {
        try {
            const data = req.body;
            const fontFamily = data.fontFamily;
            const index = data.index;
            const backcolor = data.backcolor;
            const fontSize = data.fontSize;
            const color = data.color;
            const width = data.width;

            console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor} - ${fontSize} - ${color} - ${width}`);
            // Отрендерить HTML-блок с использованием EJS
            const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
            const renderedBlock = await ejs.renderFile(blockTemplatePath, {
                fontFamily,
                backcolor,
                fontSize,
                color,
                width,
                ...req.body });
            htmlBlocks[index] = renderedBlock;
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });
};