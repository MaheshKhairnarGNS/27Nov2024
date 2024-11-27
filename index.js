//console.log("It Works...");

const express = require('express');
const appObj = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

require('dotenv').config();

appObj.use(express.json());
appObj.use(express.static('public')); // Serve static files (e.g., index.html)
appObj.use(cors()); // Enable CORS for all routes

//Promise Chain
//1. Function Definition
async function mahiFun() {
    //Every Function return something
    return await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mahigk-courses-mongodbs.pyqc6.mongodb.net/?retryWrites=true&w=majority&appName=mahigk-courses-MongoDBserver`);
    }


    const Students = mongoose.model('Students', {name : String});

//2. Function Calling
let PromiseObj = mahiFun();

//PO.then().catch()    ------ promise chain

PromiseObj.then((e)=>{
    console.log('DB Connected');

    appObj.post('/api/save_students', (req, res)=>{
        //1. req.query
        //2. req.body
        //3. req.params

        //res.sendFile(__dirname +'/index.html');

        console.log(req.body.name);

        if (!req.body.name) {
            return res.status(400).json({ msg: 'Name is required' });
        }


     const student = new Students({name:req.body.name});
     student.save().then(() => {
        //success
        console.log('Successfully Save')
        res.status(200).json({msg:"Student added successfully!"});

      }).catch(e => {
        //error
        console.log('Unable to Save')
        res.status(400).json({msg:"Failing to Call API"});
      }).finally();

    });
    
  }).catch(err => {console.log(err)}).finally((a)=>{});

  // Serve the HTML file for the root route
  appObj.get('/api/get_students', async (req, res) => {
    try{
         const students = await Students.find();
         res.status(200).json(students);
        }
        catch(error){
          console.log("Error fetching students:", error);
          res.status(500).json({msg:'Error fetching students'});

        }
});


let port = process.env.PORT || 5000;

appObj.listen(port,()=>{
    console.log('listening on port ' + port);
});