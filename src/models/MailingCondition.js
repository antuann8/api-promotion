// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// schema
const MailingConditionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
    }
});
MailingConditionSchema.plugin(timestamp);

module.exports = mongoose.model('MailingCondition', MailingConditionSchema);