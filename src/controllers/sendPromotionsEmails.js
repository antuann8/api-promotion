// plugins
const nodemailer = require('nodemailer');
const path = require("path");
const ejs = require('ejs');
const axios = require('axios');
const fs = require('fs');

// config
const config = require('../config');

async function sendPromotionsEmails(promoDataArray, matchingNames) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Отключение проверки подлинности сертификата
        }
    });

    if (matchingNames.length <= 0) {
        return 'Такого имени шаблона не существует';
    } else {
        for (let i = 0; i < matchingNames.length; i++) {
            const remoteUrl = `https://s3.super-appz.ru/download/postman/templates/${matchingNames[i]}.html`;

            try {
                const { data: htmlContent } = await axios.get(remoteUrl); // Загрузить HTML-файл с удаленного URL

                for (const promoData of promoDataArray) {
                    try {
                        const str = await ejs.render(htmlContent, { ...promoData }); // Рендеринг HTML из загруженного контента

                        // Создаем временный HTML-файл для отправки
                        const tempHtmlFile = path.join(__dirname, 'temp.html');
                        fs.writeFileSync(tempHtmlFile, str);

                        // Отправка письма
                        let mailOptions = {
                            from: 'antontest66@gmail.com',
                            to: promoData.email || '',
                            subject: 'Promotion',
                            html: str,
                        };

                        const info = await transporter.sendMail(mailOptions);
                        console.log('Email sent: ' + info.response);

                        // Удаление временного HTML-файла после отправки
                        fs.unlinkSync(tempHtmlFile);
                    } catch (err) {
                        console.error(err);
                        // Обработка ошибки или продолжение отправки остальных писем
                    }
                }
            } catch (err) {
                console.error(err);
                // Обработка ошибки загрузки HTML-файла
            }
        }
    }
}

module.exports = { sendPromotionsEmails };