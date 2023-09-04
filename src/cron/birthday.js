// start
module.exports = () => {

    // notification check

    const checkBirthdayMonthAndDay = async () => {

        try {
            //await pushSend('Тренировка', 'Пора на тренировку', '8050428124');
        } catch (err) {
            console.log(666, err);
        }


    };

    const pushSend = async (title, text, userCode) => {
        await push.add(title, null, text, 'user.fitness.userCode', userCode);
    }


    // start
    checkBirthdayMonthAndDay();

};