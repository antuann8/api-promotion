// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// schema
const TemplateNameSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    conditionName: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    },
    conditionNames: {
        type: Array,
        trim: true,
    },
    statuses: {
        type: Array,
        trim: true,
    }
});
TemplateNameSchema.plugin(timestamp);

module.exports = mongoose.model('TemplateName', TemplateNameSchema);