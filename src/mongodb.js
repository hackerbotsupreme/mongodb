const mongoose = require("mongoose")

//  this command is used to connect tthe node  to mongodb database 
mongoose.connect("mongodb://localhost:27017/LoginusingMongoDB")

.then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    console.log("failed to connect")
})
// it is a formaat of your document 
const LogInSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    }
})

// lets define  the collection part , which will follow the LogInSchema schema 
const collection = new mongoose.model('loginCollection',LogInSchema )
// this line makes sure that i will get this in index.js 
module.exports= collection
