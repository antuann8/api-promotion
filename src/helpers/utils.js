// plug-ins
var fs = require('fs');
const bcrypt = require('bcryptjs');

// start
const isObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

const fileToBase64 = (file) => fs.readFileSync(file, 'base64');

const tokenNormalize = (token) => token ? token.replace('Bearer', '').trim() : null;

const empty = (text) => text === undefined || text == null || text === '' || text.toString().trim() === '';

const password = (password, callback) => bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, async (err, hash) => callback(hash)));

const dotEnvGet = (type) => {
	type = empty(type) ? 'production' : type;
	return `${__dirname}/../../config/${type}/.env`;
};

module.exports = {
	isObjectId,
	fileToBase64,
	tokenNormalize,
	empty,
	password,
	dotEnvGet
}