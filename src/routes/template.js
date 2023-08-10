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

    const url = 'https://s3.super-appz.ru/download/postman/templates/';

    server.get(`${config.API_PATH}/template/get`, async (req, res, next) => {
        try {

            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    server.post(`${config.API_PATH}/template/create`, async (req, res, next) => {
        try {
            let html = req.body.html;

            const regex = /{([^}]+)}/g;

            if(regex.test(html)) {
                html = replaceWithTemplate(html, regex);
            }

            const upload = async (url, data) => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/html',
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
            console.log(html);
            const buffer = Buffer.from(html);
            const base64String = buffer.toString('base64');

            const uploadData = {
                "name" : "check2.html",
                "section" : "postman",
                "path" : "templates/",
                "data" : base64String,
            }

            const response = await upload('https://s3.super-appz.ru/upload', uploadData);
            console.log(response);
            // console.log(html);
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    module.exports = { htmlBlocks };
};