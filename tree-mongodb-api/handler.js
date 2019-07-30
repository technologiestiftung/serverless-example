'use strict';

// top of handler.js
require('dotenv').config({ path: './process.env' });
const connectToDatabase = require('./db');
const Tree = require('./models/Tree');

module.exports.create = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    Tree.create(JSON.parse(event.body))
       .then(tree => callback(null, {
         statusCode: 200,
         body: JSON.stringify(tree)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain' },
         body: 'Could not create the tree.'
       }));
   });
};
module.exports.getOne = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
     console.log(event);
     // Tree.findById(event.pathParameters.id)
     Tree.findOne({ _id: event.pathParameters.id })
       .then(tree => callback(null, {
         statusCode: 200,
         body: JSON.stringify(tree)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain' },
         body: 'Could not fetch the tree.'
       }));
   });
};
module.exports.getAll = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    Tree.find()
       .then(trees => callback(null, {
         statusCode: 200,
         body: JSON.stringify(trees)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain' },
         body: 'Could not fetch the trees.'
       }))
   });
};
module.exports.update = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 console.log(event.pathParameters, event);
 connectToDatabase()
   .then(() => {
    Tree.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
       .then(tree => callback(null, {
         statusCode: 200,
         body: JSON.stringify(tree)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain' },
         body: 'Could not fetch the trees.'
       }));
   });
};
module.exports.delete = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    Tree.findByIdAndRemove(event.pathParameters.id)
       .then(tree => callback(null, {
         statusCode: 200,
         body: JSON.stringify({ message: 'Removed tree with id: ' + tree._id, tree: tree })
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain' },
         body: 'Could not fetch the trees.'
       }));
   });
};