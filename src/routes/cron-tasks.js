// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// plugins
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

// models
const MailingCondition = require("../models/MailingCondition");

// cron-tasks
const { birthdayTask } = require('./../cron/cron-tasks/birthday-task');
const TemplateName = require("../models/TemplateName");


// start

module.exports = (server) => {
    server.get(`${config.API_PATH}/cron`, bodyParser.text(), async (req, res, next) => {
        try {
            // Данный запрос будет проверять статус всех cronов из БД, если оно изменилось, то менять

            // Получаю весь массив объектов
            // const mailingConditions = await MailingCondition.find();
            // await birthdayTask();
            // console.log(mailingConditions);
            res.send('cron updated');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

    server.post(`${config.API_PATH}/cron/update/:id`, async (req, res, next) => {
        try {
            const {index, condition} = req.body;
            const { id } = req.params;
            // Соответственно в зависимости от условия буду менять status[index]
            if (condition === 'birthday') {
                await birthdayTask(index, id);
            }
            res.send();
        } catch (err) {
            console.error(err);
            res.status(500).send('Внутренняя ошибка сервера');
        }
    });
}