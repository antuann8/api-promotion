// cron
const cron = require('node-cron');

// models
const MailingConditions = require('./../../models/MailingCondition')

const birthdayTask = async () => {

    let flag = "";
    const mailingConditions = await MailingConditions.find();

    for (item of mailingConditions) {
        if (item.code == "birthday") {
            flag = item.status;
        }
    }

    // console.log(mailingConditions);
    // if (flag == "true") {
    //     cron.schedule('*/5 * * * * *', () => {
    //         // require('./cron/notifications')();
    //         require('./../birthday')();
    //     });
    // }
};

module.exports = {
    birthdayTask,
};