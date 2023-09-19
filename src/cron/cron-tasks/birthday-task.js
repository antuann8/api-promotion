// plugins
const cron = require('node-cron');
const axios = require('axios');

// config
const config = require('./../../config')

// cron-modules
const { stopCronJob } = require('./stop-cron-task')
const {checkBirthdayMonthAndDay} = require('./../birthday')

// postman function
const {sendPromotionsEmails} = require("../../controllers/sendPromotionsEmails");

// models
const TemplateName = require('./../../models/TemplateName');


const startBirthdayCronJob = async (cronJob) => {

    if (cronJob === null) {
        // Создаем новую задачу cron, только если она еще не существует
        cronJob = cron.schedule('*/10 * * * * *', async () => {
            try {
                const users = await checkBirthdayMonthAndDay();
                // console.log(users);
                const result = await sendPromotionsEmails(users);
                console.log(result);
                // await axios.post('http://localhost:8190/api/v1/promotions', users);

            } catch (error) {
                console.error('Error in cron job:', error);
            }
        });
    }

    return cronJob;
};


let cronBirthdayJob = null;
const birthdayTask = async (index, status) => {
    try {
        const statusValue = status;
        console.log(statusValue);

        if (statusValue === "true") {
            const cronJob = await startBirthdayCronJob(cronBirthdayJob); // Получаем результат из startBirthdayCronJob

            cronBirthdayJob = cronJob;
        } else {
            cronBirthdayJob = stopCronJob(cronBirthdayJob); // Обновляем значение cronBirthdayJob
        }
    } catch (error) {
        console.error('Error in birthdayTask:', error);
        throw error; // Прокидываем ошибку наверх для обработки в вызывающей функции
    }
};


module.exports = {
    birthdayTask,
};