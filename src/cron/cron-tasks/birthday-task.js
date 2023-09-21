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
const MailingCondition = require('../../models/MailingCondition');

function checkStatuses(statuses, statusIndexes) {
    const results = [];
    for (let i = 0; i < statusIndexes.length; i++) {
        const index = statusIndexes[i];
        results.push(statuses[i][index] === 'true');
    }
    return results;
}
const startBirthdayCronJob = async (cronJob, matchingNames) => {

    if (cronJob === null) {
        // Создаем новую задачу cron, только если она еще не существует
        cronJob = cron.schedule('*/10 * * * * *', async () => {
            try {
                const users = await checkBirthdayMonthAndDay();
                console.log(users);
                console.log(matchingNames);
                const result = await sendPromotionsEmails(users, matchingNames);
                // console.log(result);
                // await axios.post('http://localhost:8190/api/v1/promotions', users);

            } catch (error) {
                console.error('Error in cron job:', error);
            }
        });
    }

    return cronJob;
};


let cronBirthdayJob = null;
const birthdayTask = async (isSend) => {

    try {
        // const template = await TemplateName.find({});
        const mailing = await MailingCondition.findOne({code: "birthday"});

        const birthdayId = mailing._id.toString();

        const template = await TemplateName.find({conditionId: birthdayId})

        if (!template) {
            return res.status(404).send('Шаблон не найден');
        }

        const templateNames = template.map(name => name.name);

        const conditions = template.map(condition => condition.conditionId)

        const statuses = template.map(status => status.status)

        const statusIndexes = conditions.map(item => item.indexOf(birthdayId));

        const result = checkStatuses(statuses, statusIndexes);

        let matchingNames = [];

        for (let i = 0; i < result.length; i++) {
            if (result[i] == true) {
                matchingNames.push(templateNames[i]);
            }
        }

        const isActive = result.find(item => item == true)

        if (isActive) {
            const cronJob = await startBirthdayCronJob(cronBirthdayJob, matchingNames);
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