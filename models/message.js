const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  key: String,
  uniqId: String,
  message: mongoose.Schema.Types.Mixed,
  timestamp: String,
});

module.exports = {
  MessageSchema,
};
