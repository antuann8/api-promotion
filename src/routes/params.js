// helpers
const responses = require('../helpers/responses');

// data
const { htmlBlocks } = require('./creator.js');
// const { imageUrl } = require('./image.js');

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
    let imageName = '';
    let index = 0;
    let width = '600px';

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

    server.post(`${config.API_PATH}/creator/change/getImageName`, async (req, res, next) => {
        try {

            imageName = req.body.imageName;
            index = req.body.index;
            width = req.body.width;

            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    server.post(`${config.API_PATH}/creator/change/image`, async (req, res, next) => {
        try {
            console.log('Фото получено');

            console.log(req.body);

            const upload = async (url, data) => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'postman.jt1FxnyrumJBs&V4V!5JfkG27ZUbor',
                    },
                    body: JSON.stringify(data),
                };
                try {
                    const response = await fetch(url, options);
                    console.log(response.status);
                    return response.status;
                } catch (error) {
                    console.error(error);
                }
            };


            const base64String = req.body.toString('base64');
            // console.log(base64String);
            const uploadData = {
                "name" : imageName,
                "section" : "postman",
                "path" : "images/",
                "data" : base64String,
            }

            const response = await upload('https://s3.super-appz.ru/upload', uploadData);
            console.log(response);

            imageUrl = `https://s3.super-appz.ru/download/postman/images/${imageName}`;

            const blockTemplatePath = path.join(__dirname, '../template/imageBlock.ejs');
            const renderedBlock = await ejs.renderFile(blockTemplatePath, {
                imageUrl,
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