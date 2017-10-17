const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('Mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    // db.collection('Users').deleteMany({name:'Bruno'});

    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // });
    // db.collection('Users').findOneAndDelete({_id:new ObjectID('59e5f81497cbf32138def204')}).then((result)=>{
    //     console.log(result);
    // });

    //db.close();
});