const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  order: Number,
});

module.exports = mongoose.model('Generation', schema)
