require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/middleware');

var app = express();
var port=process.env.PORT;

app.use(bodyParser.json());

//TODOS

app.post('/todos',authenticate,(req,res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',authenticate,(req,res)=>{
    //get the id
    var id = req.params.id;

    // Valid id using isValid
    if(!ObjectID.isValid(id)){
        //404 - send back empty sent
         return res.status(404).send();
    };

    // findById
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(
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

app.delete('/todos/:id',authenticate,(req,res)=>{
    //get the id
    var id = req.params.id;

    // validate the id -> not valid ? return 404
    if(!ObjectID.isValid(id)){
        //404 - send back empty sent
        return res.status(404).send();
    };

    //remove todo by id
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(
        //succes
        (todo)=>{
            //if no doc, send 404
            if(!todo){
                return res.status(404).send();
            }
            //if doc send doc with 200
            res.send({todo});
        },
        // error
        (e) => {
            //400 with empty body
            res.status(400).send(e);
    });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    };

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id:id,
        _creator: req.user._id
    },{$set:body},{new:true})
        .then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }

            res.send({todo});
        }).catch((e)=>{
            res.status(400).send()
        });

});


// USERS

app.post('/users',(req,res)=>{
    //console.log(req.body);
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(user);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req,res)=>{
    res.send(req.user);
});


//POST /users/login [email,password}
app.post('/users/login', (req,res) => {
    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user) => {
        //res.send(user);
        return user.generateAuthToken().then((token)=> {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.delete('/users/me/token', authenticate, (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
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