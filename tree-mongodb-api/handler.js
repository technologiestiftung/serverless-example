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
          body: JSON.stringify(tree),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
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
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: JSON.stringify(tree)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: 'Could not fetch the tree.'
       }));
   });
};

module.exports.getAllAge = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    // console.log(event);
    Tree.find({ $and: [{"properties.STANDALTER": { $gt: event.queryStringParameters.start}}, {"properties.STANDALTER": { $lt: event.queryStringParameters.end}}]}, {_id: 1})
                .then(trees => callback(null, {
                    statusCode: 200,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: JSON.stringify(trees.map((tree) => { return tree['_id'] }))
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: 'Could not fetch the trees.'
                }))
   });
};

module.exports.getAllAgeLimited = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 console.log(event);
 connectToDatabase()
   .then(() => {
    Tree.find({ $and: [{"properties.STANDALTER": { $gt: event.queryStringParameters.start}}, {"properties.STANDALTER": { $lt: event.queryStringParameters.end}}]}, {_id: 1}).limit(Number(event.queryStringParameters.limit)).skip(Number(event.queryStringParameters.skip))
                .then(trees => callback(null, {
                    statusCode: 200,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: JSON.stringify(trees.map((tree) => { return tree['_id'] }))
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: 'Could not fetch the trees.'
                }))
   });
};

module.exports.countAllAge = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    Tree.find({ $and: [{"properties.STANDALTER": { $gt: event.queryStringParameters.start}}, {"properties.STANDALTER": { $lt: event.queryStringParameters.end}}]}, {_id: 1}).count()
                .then(trees => callback(null, {
                    statusCode: 200,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: JSON.stringify(trees)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: 'Could not fetch the trees.'
                }))
   });
};

module.exports.getAllType = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    console.log(event);
    Tree.find(
        { "properties.GATTUNG_DEUTSCH": event.pathParameters.type })
                .then(trees => callback(null, {
                    statusCode: 200,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: JSON.stringify(trees)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true, },
                    body: 'Could not fetch the trees.'
                }))
   });
};

module.exports.getAll = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 connectToDatabase()
   .then(() => {
    Tree.find({'watered.0': {$exists: true}})
       .then(trees => callback(null, {
         statusCode: 200,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: JSON.stringify(trees)
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: 'Could not fetch the trees.'
       }))
   });
};

module.exports.update = (event, context, callback) => {
 context.callbackWaitsForEmptyEventLoop = false;
 console.log(event.pathParameters, event);
 connectToDatabase()
   .then(() => {

    Tree.findByIdAndUpdate(event.pathParameters.id, {$push: {"watered": [ event.body ]}}, { new: true })
       .then(tree => callback(null, {
         statusCode: 200,
         body: JSON.stringify(tree),
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
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
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: JSON.stringify({ message: 'Removed tree with id: ' + tree._id, tree: tree })
       }))
       .catch(err => callback(null, {
         statusCode: err.statusCode || 500,
         headers: { 'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true, },
         body: 'Could not fetch the trees.'
       }));
   });
};