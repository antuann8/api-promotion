// plug-ins
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const OrderSchema = new mongoose.Schema({}, { strict: false });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;