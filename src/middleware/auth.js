// helpers
const responses = require('../helpers/responses');

// config
const config = require('../config');

// vars
const paths = [
	's2s/search'
];

// start
module.exports = (req, res, next) => {
	const url = urlClear(req.route.path);
	if (paths.includes(url)) {
		const token = req.headers['x-token'];
		if (token !== config.S2S_KEY) {
			res.send(responses.forbidden.code, responses.forbidden);
			return next(false);
		}
		return next();
	}
	const extpath = /ext\/.*/;
	if (!extpath.test(url)) return next();
	const token = req.headers['x-token'];
	if (token !== config.SECRETKEY) {
		res.send(responses.forbidden.code, responses.forbidden);
		return next(false);
	}
	return next();
}

// prepare
const urlClear = (url) => url.replace(`${config.API_PATH}/`, '');