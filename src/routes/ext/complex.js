// // models
// const Complex = require('../../models/Complex');

// helpers
const responses = require('../../helpers/responses');

// config
const config = require('../../config');

// start
module.exports = (server) => {

	// get all complexes
	// server.get(`${config.API_PATH}/ext/complex/all`, async (req, res, next) => {
	// 	console.log('get all complexes')
	// 	try {
	// 		const complexes = await Complex.find({status:commonStatus.ACTIVE});
	// 		res.send(complexes);
	// 	} catch(error) {
	// 		res.send(responses.notFound);
	// 	}
	// 	next();
	// });

}