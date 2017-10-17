const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('Mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('59e5ff9572a7f50e98c901dd')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id:new ObjectID('59e5d1d6c53a5321286360ce')
    // },{ $set:{
    //         name:'Bruno'
    //     },
    //     $inc:{
    //         age:1
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // });

    //db.close();
});