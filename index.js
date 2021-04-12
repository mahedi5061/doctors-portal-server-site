const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.taqt5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('doctors'));
// app.use(fileUpload());

const port = process.env.PORT ||7000;

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("doctorsBookingInfo");
  app.post('/addAppointment',(req, res)=>{
      const appointment = req.body;
      console.log(appointment)
      appointmentCollection.insertOne(appointment)
      .then((result) =>{
        res.send(result.insertedCount)
      })
  })
   
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })