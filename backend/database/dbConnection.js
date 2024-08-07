import mongoose from "mongoose";

export const dbConnection = ()=>{
     const dbName = 'todoTable'
    mongoose.connect(process.env.MONGO_URI, {
        dbName
    })
    .then(()=>{
        console.log("successfully connected database 2!");
    }).catch(err=>{
        console.log(`some error occoure ${err}`);
       })
}