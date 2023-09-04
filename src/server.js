// config
const config = require('./config');

// plug-in
const restify = require('restify');
const rjwt = require('restify-jwt-community');
const rcors = require('restify-cors-middleware2');
const cron = require('node-cron');
const chalk = require('chalk');

// db
const mongoose = require('mongoose');

// middleware
const auth = require('./middleware/auth');

// start
const server = restify.createServer({
	name: config.NAME,
	version: config.VERSION
});

// middleware
server.use(restify.plugins.jsonBodyParser());
server.use(restify.plugins.queryParser());
server.use(
	rjwt({ secret: config.JWT.SECRET }).unless({
		path: [
			// web
			'/api/v1/user/login',
			// ext api
			/^\/api\/v1\/ext\/.*/,
			// server 2 server
			'/api/v1/s2s/search'
		]
	})
);
server.use(auth);
const cors = rcors({
	allowHeaders:['Authorization','X-Token']
});
server.pre(cors.preflight);
server.use(cors.actual);

// listeners
server.listen(config.PORT, () => {
	console.log(`run mode: ${chalk.bgGreen.bold(config.ENV)}`);
	console.log('%s listening at %s', server.name, server.url);
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	mongoose.connect(config.MONGODB_URI, options)
		.then(() => {
				console.log('MongoDB Successfully Connected');
			},
			(err) => {
            	console.error('MongoDB Error:', err);
            	console.log('MongoDB connection error. Please make sure MongoDB is running.');
			}
		);
	routesStart();
	cronStart();
});

const routesStart = () => {
	// front api
	require('./routes/users')(server);
	require('./routes/promo')(server);
	require('./routes/creator')(server);
	require('./routes/params')(server);
	require('./routes/clear')(server);
	require('./routes/block')(server);
	require('./routes/template')(server);
	require('./routes/image')(server);
	require('./routes/mailing')(server);
	// external api
	require('./routes/ext/complex')(server);
	// server 2 server
	require('./routes/s2s/order')(server);
};

const cronStart = () => {
	cron.schedule(`*/1 * * * *`, () => {

		// require('./cron/notifications')();

	});
};

// end