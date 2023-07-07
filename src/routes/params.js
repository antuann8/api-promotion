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
    // server.post(`${config.API_PATH}/creator/change/backgroundColor`, async (req, res, next) => {
    //     try {
    //         const data = req.body;
    //         const backcolor = data.backcolor;
    //         const index = data.index;
    //         const fontFamily = data.fontFamily;
    //         const fontSize = data.fontSize;
    //         const color = data.color;
    //
    //         console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor}`);
    //
    //         // Отрендерить HTML-блок с использованием EJS
    //         const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
    //         const renderedBlock = await ejs.renderFile(blockTemplatePath, {
    //             backcolor,
    //             fontFamily,
    //             fontSize,
    //             color,
    //             ...req.body });
    //         htmlBlocks[index] = renderedBlock;
    //         res.send();
    //     } catch (err) {
    //         console.log(666, err);
    //         res.status(500).send('Internal Server Error');
    //         next();
    //     }
    // });
    //
    //
    // server.post(`${config.API_PATH}/creator/change/fontFamily`, async (req, res, next) => {
    //     try {
    //         const data = req.body;
    //         const fontFamily = data.fontFamily;
    //         const index = data.index;
    //         const backcolor = data.backcolor;
    //         const fontSize = data.fontSize;
    //         const color = data.color;
    //
    //         console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor} - ${fontSize} - ${color}`);
    //         // Отрендерить HTML-блок с использованием EJS
    //         const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
    //         const renderedBlock = await ejs.renderFile(blockTemplatePath, {
    //             fontFamily,
    //             backcolor,
    //             fontSize,
    //             color,
    //             ...req.body });
    //         htmlBlocks[index] = renderedBlock;
    //         res.send();
    //     } catch (err) {
    //         console.log(666, err);
    //         res.status(500).send('Internal Server Error');
    //         next();
    //     }
    // });

    // server.post(`${config.API_PATH}/creator/change/fontSize`, async (req, res, next) => {
    //     try {
    //         const data = req.body;
    //         const fontFamily = data.fontFamily;
    //         const index = data.index;
    //         const backcolor = data.backcolor;
    //         const fontSize = data.fontSize;
    //         const color = data.color;
    //
    //         console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor} - ${fontSize} - ${color}`);
    //         // Отрендерить HTML-блок с использованием EJS
    //         const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
    //         const renderedBlock = await ejs.renderFile(blockTemplatePath, {
    //             fontFamily,
    //             backcolor,
    //             fontSize,
    //             color,
    //             ...req.body });
    //         htmlBlocks[index] = renderedBlock;
    //         res.send();
    //     } catch (err) {
    //         console.log(666, err);
    //         res.status(500).send('Internal Server Error');
    //         next();
    //     }
    // });

    server.post(`${config.API_PATH}/creator/change/params`, async (req, res, next) => {
        try {
            const data = req.body;
            const fontFamily = data.fontFamily;
            const index = data.index;
            const backcolor = data.backcolor;
            const fontSize = data.fontSize;
            // const color = data.color;

            console.log(`Блок № ${index + 1} : ${fontFamily} - ${backcolor} - ${fontSize}`);
            // Отрендерить HTML-блок с использованием EJS
            const blockTemplatePath = path.join(__dirname, '../template/block.ejs');
            const renderedBlock = await ejs.renderFile(blockTemplatePath, {
                fontFamily,
                backcolor,
                fontSize,
                // color,
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