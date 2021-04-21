const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const link = "";

console.log(MongoClient.connect(link));
