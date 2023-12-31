const ok				= ({code:0});
const badrequest		= ({code:400});
const unauthorized		= ({code:401});
const forbidden			= ({code:403});
const notFound			= ({code:404});
const exist				= ({code:409});
const internalError		= ({code:500});

module.exports = {
	ok,
	badrequest,
	unauthorized,
	forbidden,
	notFound,
	exist,
	internalError
}