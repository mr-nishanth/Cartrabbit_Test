const mongoose = require('mongoose');

function isValidMongoObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = isValidMongoObjectId;
