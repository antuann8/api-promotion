// plug-ins
const fetch = require('cross-fetch');

// models
const Push = require('../models/Push');

// config
const config = require('../config');

// add
exports.add = async (title, subtitle, text, tag, value, data) => {
	try {
		const push = new Push({title, subtitle, text, tag, value, data});
		await push.save();
		await send(title, subtitle, text, tag, value, data);
	} catch (error) {
		console.log('push error:', error);
	}
}

// send push
const send = async (title, subtitle, text, tag, value, data) => {
	const d = {
		app_id: config.PUSH.APP_ID,
		filters: [
			{
				field: 'tag',
				key: tag,
				value
			}
		],
		data:data||null,
		contents: {
			en: text
		},
		headings: {
			en: title
		},
		subtitle: {
			en: subtitle || ''
		},
		ios_badgeType: 'Increase',
		ios_badgeCount: 1
	};
	console.log(d)
	const options = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Authorization': `Basic ${config.PUSH.SECRET}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(d)
	};
	const response = await fetch(`${config.PUSH.URL}`, options);
	const json = await response.json();
	console.log('push', response.status, json);
}