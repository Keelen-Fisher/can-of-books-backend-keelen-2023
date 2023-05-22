'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Books = require('./models/Books.js');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3001;



//Proof of life at localhost:3000/test
app.get('/test', (request, response) => {
  response.send('test request received');
});

//Establish .get for /books route
app.get('/books', getBooks);

// /books async function
async function getBooks(request, response, next) {
  try {
    let results = await Books.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

// /books post async function

app.post('/books', postBook);

async function postBook(request, response, next) {
  console.log(request.body);
  try {
    const newBook = await Books.create(request.body);
    response.status(201).send(newBook);
  } catch (error) {
    next(error);
  }
}

// /books delete async function

app.delete('/books/:id', deleteBook);

async function deleteBook(request, response, next) {
  const id = request.params.id;
  console.log(id);
  try {
    await Books.findByIdAndDelete(id);
    response.status(204).send('Book Deleted');
  }catch (error) {
    next(error);
  }
}

// /books put async function

app.put('/books/:id', putBooks);

async function putBooks(request, response, next){
  const id = request.params.id;
  try {
    //updated book in formation coming in on the body
    let data = request.body;

    //findByIdAndUpdate method - 3 arguments
    //1. id of the thing to update
    //2. id of the thing to update
    //3. option objects - { new:true, overwrite: true }

    const updateBook = await Books.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    response.status(200).send(updateBook);

  }catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
