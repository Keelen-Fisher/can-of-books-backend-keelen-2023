//This is whre I will develop my schema
// What data should look like

'use strict';
// Bring in Mongoose
const mongoose = require('mongoose');
// require('dotenv').config();
// extract Schema property from the mongoose object
const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL);
const bookSchema = new Schema ({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true }
});

const bookModel = mongoose.model('Books', bookSchema);

module.exports = bookModel;
