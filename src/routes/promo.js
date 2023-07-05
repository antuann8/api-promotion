// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// plugins
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
// const serveStatic = require('restify-plugins').serveStatic;
const nodemailer = require('nodemailer');
// const OAuth2 = google.auth.OAuth2;

// start

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // Отключение проверки подлинности сертификата
    }
});

module.exports = (server) => {
    server.post(`${config.API_PATH}/promotion`, bodyParser.text(), async (req, res, next) => {
        try {
            const promoData = req.body; // Получаем тело запроса и сохраняем его в promoData

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

    server.post(`${config.API_PATH}/promotions`, bodyParser.text(), async (req, res, next) => {
        try {
            const promoDataArray = req.body; // Используем req.body как массив объектов данных

            console.log(promoDataArray);
            console.log(path.join(__dirname, '../../public'));

            const filePath = path.join(__dirname, '../template/check.ejs');

            for (const promoData of promoDataArray) {
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
                            // Можете обработать ошибку или продолжить отправку остальных писем
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
            }

            res.send('Emails sent');
        } catch (error) {
            console.error(error);
            return next(error);
        }
    });

}