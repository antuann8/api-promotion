// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// schema
const RequisiteSchema = new mongoose.Schema({
    inn: {
        type: String,
        trim: true,
        // required: true
    },
    organizationName: {
        type: String,
        trim: true,
        // required: true
    },
    site: {
        type: String,
        trim: true,
        // required: true
    },
    address: {
        type: String,
        trim: true,
        // required: true
    },
    email: {
        type: String,
        trim: true,
        // required: true
    },
    nds: {
        type: Number,
        trim: true,
        // required: true
    },
    KKT: {
        type: String,
        trim: true,
        // required: true
    },
    FN: {
        type: String,
        trim: true,
        // required: true
    },
    FD: {
        type: String,
        trim: true,
        // required: true
    },
    FP: {
        type: String,
        trim: true,
        // required: true
    },
    ogrn: {
        type: String,
        trim: true,
        // required: true
    },
    kpp: {
        type: String,
        trim: true,
        // required: true
    },
    bik: {
        type: String,
        trim: true,
        // required: true
    },
    account: {
        type: String,
        trim: true,
        // required: true
    },
    correspondentAccount: {
        type: String,
        trim: true,
        // required: true
    },
    type : {
        type: String,
        trim: true,
    },
    typeName : {
        type: String,
        trim: true,
    }
});

RequisiteSchema.plugin(timestamp);

module.exports = mongoose.model('Requisite', RequisiteSchema);