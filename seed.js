'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Books = require('./models/Books.js');

async function seed(){
  await Books.create({
    title: 'The Hobbit',
    description: 'A hobbit goes on an unexpected journey',
    status: 'Available'
  });
  await Books.create({
    title: 'Green Eggs and Ham',
    description: 'An argument about the quality of breakfast',
    status: 'Available'
  });
  await Books.create({
    title: 'The Prince',
    description: 'A political treatise from 16th century Italy',
    status: 'Available'
  });
  console.log('Seeded, closing connection');
  mongoose.disconnect();
}

seed();
