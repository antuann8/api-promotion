// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// functions
const { sendPromotionsEmails } = require('./../controllers/sendPromotionsEmails');

// plugins
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const nodemailer = require('nodemailer');

// start

module.exports = (server) => {
    server.post(`${config.API_PATH}/promotion`, bodyParser.text(), async (req, res, next) => {
        try {
            const promoData = req.body; // Получаем тело запроса и сохраняем его в promoData
            console.log('Запрос есть')
            console.log(promoData);
            console.log(path.join(__dirname, '../../public'));

            const filePath = path.join(__dirname, '../template/check.ejs');
            ejs.renderFile(filePath, { promoData }, (err, str) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                // Отправка письма
                let mailOptions = {
                    from: 'antontest66@gmail.com',
                    to: promoData.email || '',
                    subject: 'Promotion',
                    html: str,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        return next(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send('Email sent');
                    }
                });
            });
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

    // server.post(`${config.API_PATH}/promotions`, bodyParser.text(), async (req, res, next) => {
    //     try {
    //         const promoDataArray = req.body; // Используем req.body как массив объектов данных
    //
    //         console.log(promoDataArray);
    //         console.log(path.join(__dirname, '../../public'));
    //
    //         const filePath = path.join(__dirname, '../template/check.ejs');
    //
    //         for (const promoData of promoDataArray) {
    //             ejs.renderFile(filePath, { promoData }, (err, str) => {
    //                 if (err) {
    //                     console.error(err);
    //                     return next(err);
    //                 }
    //
    //                 // Отправка письма
    //                 let mailOptions = {
    //                     from: 'antontest66@gmail.com',
    //                     to: promoData.email || '',
    //                     subject: 'Promotion',
    //                     html: str,
    //                 };
    //
    //                 transporter.sendMail(mailOptions, (error, info) => {
    //                     if (error) {
    //                         console.error(error);
    //                         // Можете обработать ошибку или продолжить отправку остальных писем
    //                     } else {
    //                         console.log('Email sent: ' + info.response);
    //                     }
    //                 });
    //             });
    //         }
    //
    //         res.send('Emails sent');
    //     } catch (error) {
    //         console.error(error);
    //         return next(error);
    //     }
    // });

    server.post(`${config.API_PATH}/promotions`, bodyParser.text(), async (req, res, next) => {
        try {
            const promoDataArray = req.body; // Используем req.body как массив объектов данных
            // Вызываем функцию для отправки писем
            await sendPromotionsEmails(promoDataArray);
            res.send();
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

    server.get(`${config.API_PATH}/get/example/users`, async (req, res, next) => {
        try {

            // Полный путь к файлу JSON
            const filePath = path.join(__dirname, '../example-database/example-database.json');

            // Чтение содержимого файла
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                // Отправляем содержимое файла как JSON
                res.setHeader('Content-Type', 'application/json');
                res.send(200, data);
            });
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });
}