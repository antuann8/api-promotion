// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// schema
const BlockSchema = new mongoose.Schema({
    html: {
        type: String,
        trim: true,
    },
    index: {
        type: Number,
        trim: true,
    }
});
BlockSchema.plugin(timestamp);

module.exports = mongoose.model('Block', BlockSchema);