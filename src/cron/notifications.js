// controllers
const push = require('../controllers/push');

// models
const Schedule = require('../models/Schedule');
const Notification = require('../models/Notification');

// enums
const notificationStatus = require('../enums/notificationStatus');
const notificationType = require('../enums/notificationType');

// config
const config = require('../config');

let cnt = 0;

// start
module.exports = () => {

	// notification check

	const checkNotifications = async () => {
		// console.log('pushes')

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
	checkNotifications();

};