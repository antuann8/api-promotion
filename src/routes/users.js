// plug-ins
const jwt = require('jsonwebtoken');

// controllers
const auth = require('../controllers/auth');

// models
const User = require('../models/User');

// enums
const userStatus = require('../enums/userStatus');

// helpers
const responses = require('../helpers/responses');
const sanitize = require('../helpers/sanitize');
const utils = require('../helpers/utils');

// config
const config = require('../config');

// start
module.exports = (server) => {

	// user admin login
	server.post(`${config.API_PATH}/user/login`, async (req, res, next) => {
		console.log('user admin login', req.body);
		try {
			const { username, password } = req.body;
			const user = await auth.authenticate(username, password);
			const token = jwt.sign(user.toJSON(), config.JWT.SECRET, { expiresIn: config.JWT.TTL });
			const { iat, exp } = jwt.decode(token);
			res.send({ iat, exp, token, user: sanitize.user(user) });
		} catch (err) {
			console.log(666, err);
			res.send(responses.unauthorized.code, responses.unauthorized);
		}
		next();
	});

	// user admin add
	server.post(`${config.API_PATH}/user/add`, async (req, res, next) => {
		console.log('user admin add', req.body, req.user);
		try {
			const { name, password, username, phone } = req.body;
			const user = new User({
				name,
				username,
				password,
				phone,
				status:userStatus.ACTIVE
			});
			const exist = await User.findOne({username});
			if (exist) {
				res.send(responses.exist.code, responses.exist);
				return next();
			}
			else {
				utils.password(user.password, async (hash) => {
					user.password = hash;
					await user.save();
					res.send();
					next();
				});
			}
		} catch (err) {
			console.log(666, err);
			res.send(responses.internalError.code, responses.internalError);
			next();
		}
	});

	// user admin update
	server.post(`${config.API_PATH}/user/update/:id`, async (req, res, next) => {
		console.log('user admin update', req.params, req.body, req.user);
		const { id } = req.params;
		try {
			const user = await User.findOne({_id:id});
			if (!user) throw 'User not found';
			const data = {user, ...req.body};
			const password = req.body.password;
			if (password) {
				utils.password(password, async (hash) => {
					data.password = hash;
					await User.updateOne({_id:id}, data);
					res.send();
					return next();
				});
			} else await User.updateOne({_id:id}, data);
			res.send();
		} catch (err) {
			console.log(666, err);
			res.send(responses.internalError.code, responses.internalError);
		}
		next();
	});

	// users get
	server.post(`${config.API_PATH}/users`, async (req, res, next) => {
		console.log('users admin get', req.user);
		try {
			const users = await User.find();
			res.send(sanitize.users(users));
		} catch (err) {
			console.log(666, err);
			res.send(responses.internalError.code, responses.internalError);
		}
		next();
	});

	// user get
	server.post(`${config.API_PATH}/user/:id`, async (req, res, next) => {
		console.log('user admin get', req.params, req.user);
		try {
			const { id } = req.params;
			const user = await User.findOne({_id:id});
			res.send(sanitize.user(user));
		} catch (err) {
			console.log(666, err);
			res.send(responses.internalError.code, responses.internalError);
		}
		next();
	});

};