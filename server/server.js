const expect = require('expect');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port=Proces.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    // Valid id using isValid
    if(!ObjectID.isValid(id)){
        //404 - send back empty sent
         return res.status(404).send();
    };

    // findById
    Todo.findById(id).then(
        // succes
        (todo) => {
            if(!todo){
                return res.status(404).send();
            }
            // if todo - sent it back
            res.send({todo});
        },
        // error
        (e) => {
        // 400 - and send body back
        res.status(400).send(e);
    });
});


app.listen(port,() => {
    console.log(`Started on port ${port}`);
})

// // Todo
// var todo = new Todo({
//     text:'Cook diner'
// });
// var todo = new Todo({
//     text:'Play Chess',
//     completed:true,
//     completedAt:123456789
// });// todo.save().then((doc) => {
//     console.log('Saved todo',doc);
// },(e) => {
//     console.log('Unable to save todo');
// });



// // User
// var user = new User({
//   email:'   bruno@example.com    '
// });
// user.save().then((doc) => {
//     console.log('User saved',doc);
// },(e) => {
//     console.log('Unable to save user',e);
// });


module.exports={app};