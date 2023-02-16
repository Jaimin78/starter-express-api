const {MongoClient} = require('mongodb');
const url = "mongodb+srv://Jaimin:jaimin@jaimin.qjzvkio.mongodb.net/Jaimin?retryWrites=true&w=majority";
const database = "Jaimin";

const client = new MongoClient(url)

async function connectMongo(){
  let result = await client.connect();
  let db = result.db(database)
  return db.collection('products')
}

module.exports = connectMongo;
