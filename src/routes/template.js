// helpers
const responses = require('../helpers/responses');

// data
const { htmlBlocks } = require('./creator.js');
const replaceWithTemplate = require('./../controllers/replaceWithTemplate');

// models
const TemplateName = require('../models/TemplateName');

// config
const config = require('../config');

// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const fetch = require("node-fetch-npm");
const User = require("../models/User");
const utils = require("../helpers/utils");
const {ok} = require("../helpers/responses");

// start

module.exports = (server) => {

    const url = 'https://s3.super-appz.ru/download/postman/templates/';

    server.get(`${config.API_PATH}/template/names`, async (req, res, next) => {
        try {
            const names = await TemplateName.find({}, 'name');

            res.send(names);
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    server.post(`${config.API_PATH}/template/name/add`, async (req, res, next) => {
        try {
            const {name} = req.body;

            const templateName = new TemplateName({
                name,
            });

            const exist = await TemplateName.findOne({name});
            console.log(exist);

            if (exist) {
                res.status(409);
                res.send();
                return next();
            } else {
                await templateName.save();
                res.status(responses.ok.code);
                res.send();
                next();
            }

        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    server.post(`${config.API_PATH}/template/create`, async (req, res, next) => {
        try {
            let html = req.body.html;
            let name = req.body.name;

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
                "name" : name,
                "section" : "postman",
                "path" : "templates/",
                "data" : base64String,
            }

            const response = await upload('https://s3.super-appz.ru/upload', uploadData);
            console.log(response);
            // console.log(html);
            // htmlBlocks.length = 0;
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });

    module.exports = { htmlBlocks };
};