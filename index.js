const express = require('express');
const connectMongo = require('./mongodb');
const app = express();

//This Middleware is used to parse data before Express 4.6v we are using body.parser()
app.use(express.json())

//POST Request API
app.post('/', async (req,res) => {
  let data = await connectMongo();
  let result = await data.insertMany(req.body);
  res.send(result)
})


//GET Request API
app.get('/', async (req,res) => {
   let conn = await connectMongo();
   let data = await conn.find().toArray();
   res.send(data)
})

app.listen(2030)
