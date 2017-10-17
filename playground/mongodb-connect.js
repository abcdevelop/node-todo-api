//const MongoClient = require('mongodb').MongoClient;

// var user = {name:'Bruno',age:50};
// var {name}=user;
// console.log(name);
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('Mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');


    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    db.collection('Users').insertOne({
        name:'Bruno',
        age:50,
        location:'Paris'
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert user',err);
        }

        console.log(JSON.stringify(result.ops,undefined,2));
        //console.log(result.ops[0]._id.getTimestamp();
    });


    db.close();
});