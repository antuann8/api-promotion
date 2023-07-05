// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// schema
const PushSchema = new mongoose.Schema({
	userId: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	subtitle: {
		type: String,
		trim: true
	},
	text: {
		type: String,
		required: true,
		trim: true
	},
	tag: {
		type: String,
		trim: true
	},
	value: {
		type: String,
		trim: true
	},
	data: {
		type: String,
		trim: true
	}
});
PushSchema.plugin(timestamp);

module.exports = mongoose.model('Push', PushSchema);