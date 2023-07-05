// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// enums
const notificationStatus = require('../enums/notificationStatus');
const notificationType = require('../enums/notificationType');

// schema
const NotificationSchema = new mongoose.Schema({
	extId: {
		type: String,
		required: true,
		trim: true
	},
	date: {
		type: Date,
		default: null
	},
	type: {
		type: Number,
		default: notificationType.UNKNOWN
	},
	status: {
		type: Number,
		default: notificationStatus.SEND
	}
});
NotificationSchema.plugin(timestamp);

module.exports = mongoose.model('Notification', NotificationSchema);