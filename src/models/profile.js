const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  language: String,
  firstname: String,
  lastname: String,
  nickname: String,
});

module.exports = mongoose.model('Profile', schema)
