// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// enums
const userStatus = require('../enums/userStatus');

// schema
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	username: {
		type: String,
		trim: true,
		// required: true
	},
	password: {
		type: String,
		trim: true,
		// required: true
	},
	phone: {
		type: String,
		trim: true,
		// required: true
	},
	comment: {
		type: String,
		trim: true
	},
	status: {
		type: Number,
		default: userStatus.UNKNOWN
	}
});
UserSchema.plugin(timestamp);

module.exports = mongoose.model('User', UserSchema);