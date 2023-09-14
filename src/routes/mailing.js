// models
const MailingCondition = require('../models/MailingCondition');

// config
const config = require('../config');

// plugins
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

// start

module.exports = (server) => {

    server.get(`${config.API_PATH}/get/mailing/conditions`, async (req, res, next) => {
        try {

            const conditions = await MailingCondition.find();
            res.send(conditions);

        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

    // server.post(`${config.API_PATH}/change/mailing/conditions/:code`, async (req, res, next) => {
    //     try {
    //         const status = req.body;
    //         const {code} = req.params;
    //
    //         console.log(status);
    //         console.log(code);
    //
    //         const condition = await MailingCondition.findOne({ code: code });
    //
    //         if (!condition) {
    //             return res.status(404).json({ message: 'Условие не найдено' });
    //         }
    //
    //         condition.status = status;
    //         await condition.save();
    //
    //         res.send();
    //         return next();
    //     } catch (error) {
    //         console.error(error);
    //         return next(error);
    //     }
    // });

}