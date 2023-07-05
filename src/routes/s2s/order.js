// models
const Order = require('../../models/Order');

// helpers
const responses = require('../../helpers/responses');
const fetch = require('node-fetch-npm');
// config
const config = require('../../config');

//order create

// start
module.exports = (server) => {

	// // s2s catalog search
	// server.post(`${config.API_PATH}/s2s/search`, async (req, res, next) => {
	// 	console.log('s2s catalog search', req.body);
	// 	try {
	// 		const { search } = req.body;
	// 		const exercises = await Exercise.find({name:{$regex:search,$options:'i'}});
	// 		const complexes = await Complex.find({task:{$regex:search,$options:'i'}});
	// 		const out = exercises.length === 0 && complexes.length === 0 ? null
	// 			: {complexes,exercises};
	// 		res.send(out);
	// 	} catch (err) {
	// 		console.log(666, err);
	// 		res.send(responses.internalError.code, responses.internalError);
	// 	}
	// 	next();
	// });
	server.post(`${config.API_PATH}/s2s/order`, async (req, res, next) => {
		console.log('s2s order search', req.body);
		try {
			const data = req.body;
			const getAPI = async (url, data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Token': config.S2S_KEY
					},
					body: JSON.stringify(data)
				};
				const response = await fetch(url, options);
				if (response.status === 200) {
					const json = await response.json();
					return json;
				}
				return null;
			};

			try {
				const orderData = await getAPI(`https://api.food.super-appz.ru/api/v1/s2s/ordersjgk`, data);
				console.log(orderData);
				const orderNewData = orderData; // Объединяем req.body и result в один объект
				const order = new Order(orderNewData); // Создание нового документа на основе объединенного объекта
				const savedOrder = await order.save(); // Сохранение документа в базе данных

				res.send(savedOrder);
			} catch (error) {
				// Обработка ошибки
				console.error('Ошибка при выполнении запроса:', error);
			}

		} catch (err) {
			console.log(666, err);
			res.send(responses.internalError.code, responses.internalError);
		}
		next();
	});
}