const crypto = require('crypto');
function generateHash(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

module.exports = generateHash;