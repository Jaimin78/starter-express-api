const express = require('express');
const connectMongo = require('./mongodb');
const app = express();

//If we are deleting data using _id than we have to pass id as object and we require mongodb for that
const mongodb = require('mongodb');

//This Middleware is used to parse data before Express 4.6v we are using body.parser()
app.use(express.json())

//GET Request API
app.get('/', async (req,res) => {
   let conn = await connectMongo();
   let data = await conn.find().toArray();
   res.send(data)
})

//POST Request API
app.post('/', async (req,res) => {
  let data = await connectMongo();
  let update = await data.insertOne(req.body);
  res.send(update)
})


//Put - Updating data through name parameter
app.put('/:name', async (req,res) => {
  let data = await connectMongo();
  let update = await data.updateOne(
    {name: req.params.name},{
     $set:req.body
    }
  )
  res.send(update)
})

//Delete data using Id as parameter
app.delete('/:id', async (req,res) => {
  let data = await connectMongo();
  let deleteData = await data.deleteOne({
    //We have to pass _id as Object 
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.send(deleteData)
})

app.listen(2030)

