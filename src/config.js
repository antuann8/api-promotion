// helpers
const utils = require('./helpers/utils');

// plug-ins
require('dotenv').config({path:utils.dotEnvGet(process.argv[2])});

// config
const cfg = process.env;
module.exports = {
	ENV			: cfg.NODE_ENV,

	NAME		: cfg.NAME,
	VERSION		: cfg.VERSION,

	EMAIL       : cfg.EMAIL,
	PASSWORD    : cfg.PASSWORD,

	PORT		: cfg.PORT,
	URL			: cfg.BASE_URL,

	MONGODB_URI	: cfg.MONGODB_URI,

	SECRETKEY	: cfg.SECRETKEY,

	S2S_KEY		: cfg.S2S_KEY,

	API_PATH	: cfg.API_PATH,

	JWT			: {
		TTL		: cfg.JWT_TTL,
		SECRET	: cfg.JWT_SECRET,
	},

	FILESERVER	: {
		URL		: cfg.FILESERVER_URL,
		KEY		: cfg.FILESERVER_KEY
	},

	PASSPORT	: {
		url		: cfg.PASSPORT_CHECK
	},

	PUSH: {
		URL		: cfg.PUSH_URL,
		APP_ID	: cfg.PUSH_APP_ID,
		SECRET	: cfg.PUSH_SECRET
	}

};