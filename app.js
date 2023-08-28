const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const User = require('./models/user'); 
const Fruit = require('./models/fruit');
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server:{sslCA:cert}};


const connString = 'mongodb+srv://admin:Holdshut45@cluster0.rvjuc3f.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connString)
.then(()=>
{
    console.log('Connected')
})
.catch((error)=>
{
    console.error('Connection Error:', error);
},options);

app.use(express.json())

app.use((reg,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});

app.get(urlprefix+'/fruits',(req,res)=>{
    res.send('Hello World')
})

app.get(urlprefix+'/fruits',(req,res)=>{
    // const orders=[
    //     {
    //         id:"1",
    //         name:"orange"
    //     },
    //     {
    //         id:"2",
    //         name:"Banana"
    //     },
    //     {
    //         id:"3",
    //         name:"Pear"
    //     }
    // ];

    Fruit.find().then((fruit)=>{
        res.json(
            {
                message:"Fruits found",
                fruit: fruit
            }
        );
    })
    
});

app.post(urlprefix+'/fruits',(req,res)=>{
    const fruit = new Fruit(
        {
            id: req.body.id,
            name: req.body.name
        }
    )
    fruit.save();
    res.status(201).json({
        message:'fruit created',
        fruit: Fruit
    })
})


app.post(urlprefix + '/users', (req, res) => {
    // User data sent from frontend
    const userData = req.body; 
    const user = new User(userData);

    user.save()
      .then(() => {
        res.status(201).json({
          message: 'User created',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(400).json({
          message: 'Failed to create user',
        });
      });
  });
  

module.exports = app;