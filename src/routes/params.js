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
const fetch = require("node-fetch-npm");

// start

module.exports = (server) => {

    let imageUrl = ['https://s3.super-appz.ru/download/postman/images/ex.jpg'];

    server.post(`${config.API_PATH}/creator/change/params`, async (req, res, next) => {
        try {
            const data = req.body;
            const fontFamily = data.fontFamily;
            const index = data.index;
            const backcolor = data.backcolor;
            const fontSize = data.fontSize;
            const color = data.color;
            const width = data.width;
            const height = data.height;
            const text = data.text;
            const blockType = data.blockType;
            const arrow = data.arrow;

            console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor} - ${fontSize} - ${color} - ${width} - ${height} - ${text} - ${arrow}`);
            // Отрендерить HTML-блок с использованием EJS

            let blockTemplatePath = '';
            let renderedBlock;

            if (blockType === 'text') {
                blockTemplatePath = path.join(__dirname, '../template/block.ejs');
                renderedBlock = await ejs.renderFile(blockTemplatePath, {
                    fontFamily,
                    backcolor,
                    fontSize,
                    color,
                    width,
                    height,
                    text,
                    ...req.body });
            } else if (blockType === 'arrow') {
                blockTemplatePath = path.join(__dirname, '../template/arrowBlock.ejs');
                renderedBlock = await ejs.renderFile(blockTemplatePath, {
                    fontFamily,
                    backcolor,
                    fontSize,
                    color,
                    width,
                    height,
                    text,
                    arrow,
                    ...req.body });
            } else if (blockType === 'image') {

                blockTemplatePath = path.join(__dirname, '../template/imageBlock.ejs');
                renderedBlock = await ejs.renderFile(blockTemplatePath, {
                    width,
                    imageUrl,
                    ...req.body });
            }

            htmlBlocks[index] = renderedBlock;

            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });
};