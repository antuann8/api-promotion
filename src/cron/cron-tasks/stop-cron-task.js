const stopCronJob = (cronJob) => {
    if (cronJob !== null) {
        // Если задача cron существует, уничтожаем ее
        cronJob.stop();
        cronJob = null;
        console.log('Задача cron уничтожена')
    }
    return cronJob;
};

module.exports = {
    stopCronJob,
};