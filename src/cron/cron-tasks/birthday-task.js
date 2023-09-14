// cron
const cron = require('node-cron');

// models
const TemplateName = require('./../../models/TemplateName');

let cronBirthdayJob = null;
const birthdayTask = async (index, id) => {
    const template = await TemplateName.findOne({ _id: id });
    const statusValue = template.status[index];
    // const statusValue = status;

    if (statusValue === "true") {
        if (cronBirthdayJob === null) {
            cronBirthdayJob = cron.schedule('*/5 * * * * *', () => {
                require('./../birthday')();
            });
        }
    } else {
        stopCronJob(cronBirthdayJob);
    }
};

const stopCronJob = (cronJob) => {
    if (cronJob !== null) {
        // Если задача cron существует, уничтожаем ее
        cronJob.stop();
        cronJob = null;
        console.log('Задача cron уничтожена')
    }
};

module.exports = {
    birthdayTask,
    stopCronJob,
    cronJob,
};