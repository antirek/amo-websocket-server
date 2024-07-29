const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const {MessageSchema} = require('./message');

const settingsConnection = mongoose.createConnection(config.mongodb);

const Message = settingsConnection.model('Message', MessageSchema);

module.exports = {
  Message,
}
