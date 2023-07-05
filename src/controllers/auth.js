// plug-ins
const bcrypt = require('bcryptjs');

// model
const User = require('../models/User');

// enums
const userStatus = require('../enums/userStatus');

// start
exports.authenticate = (username, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({username,status:userStatus.ACTIVE})
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					resolve(user);
				} else {
					reject('Failed to authenicate user');
				}
			});
		} catch (err) {
			reject('Sorry, Authentication failed');
		}
	});
}