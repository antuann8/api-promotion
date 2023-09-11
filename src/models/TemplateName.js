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
    conditionId: {
        type: Array,
        trim: true,
        required: true,
    },
    status: {
        type: Array,
        trim: true,
        required: true,
    }
});
TemplateNameSchema.plugin(timestamp);

module.exports = mongoose.model('TemplateName', TemplateNameSchema);