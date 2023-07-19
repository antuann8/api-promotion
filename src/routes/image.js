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
                    // В данном контексте у вас отсутствует переменная res, поэтому я закомментировал эту строку.
                    // res.status(500).send(error.message);
                }
            };


            const base64String = req.body.toString('base64');
            // console.log(base64String);
            const uploadData = {
                "name" : "ex.jpg",
                "section" : "postman",
                "path" : "images/",
                "data" : base64String,
            }
            console.log(uploadData);
            const response = await upload('https://s3.super-appz.ru/upload', uploadData);
            console.log(response);
            res.send();
        } catch (err) {
            console.log(666, err);
            res.status(500).send('Internal Server Error');
            next();
        }
    });
};