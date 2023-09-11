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


// start

module.exports = (server) => {
    server.get(`${config.API_PATH}/cron`, bodyParser.text(), async (req, res, next) => {
        try {
            // Данный запрос будет проверять статус всех cronов из БД, если оно изменилось, то менять

            // Получаю весь массив объектов
            const mailingConditions = await MailingCondition.find();
            await birthdayTask();
            // console.log(mailingConditions);
            res.send('cron updated');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

    // server.post(`${config.API_PATH}/template/name/add`, async (req, res, next) => {
    //     try {
    //         const {name} = req.body;
    //
    //         const templateName = new TemplateName({
    //             name,
    //         });
    //
    //         const exist = await TemplateName.findOne({name});
    //         console.log(exist);
    //
    //         if (exist) {
    //             res.status(409);
    //             res.send();
    //             return next();
    //         } else {
    //             await templateName.save();
    //             res.status(responses.ok.code);
    //             res.send();
    //             next();
    //         }
    //
    //     } catch (err) {
    //         console.log(666, err);
    //         res.status(500).send('Internal Server Error');
    //         next();
    //     }
    // });

    // server.get(`${config.API_PATH}/get/example/users`, async (req, res, next) => {
    //     try {
    //
    //         // Полный путь к файлу JSON
    //         const filePath = path.join(__dirname, '../example-database/example-database.json');
    //
    //         // Чтение содержимого файла
    //         fs.readFile(filePath, 'utf8', (err, data) => {
    //             if (err) {
    //                 console.error(err);
    //                 return next(err);
    //             }
    //
    //             // Отправляем содержимое файла как JSON
    //             res.setHeader('Content-Type', 'application/json');
    //             res.send(200, data);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         return next(error);
    //     }
    // });
}