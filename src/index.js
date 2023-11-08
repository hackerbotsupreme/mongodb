const express = require('express')
const app = express();
const path = require('path');
// inorder to work those render we need to requier 
const hbs = require("hbs");
const collection= require("./mongodb")


const templatePath = path.join(__dirname,"../templates")

app.use(express.json())
// we are efining that our view engine is hbs so if we need to use others like ejs or pug js will will
// just write ejs or pug instead of hbs 
app.set("view engine","hbs")
// this is telling that instead of views follow templatePath
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

// this -> '/' -> denotes the default one 
app.get('/',(req,res)=>{
    res.render("login")
    // this will renderthe login.hbs file 
})


// we will do the same for rest too 
app.get('/signup',(req,res)=>{
    res.render("signup")
    // this will renderthe login.hbs file 
})

//  in order to work with mongodb we have to write in async await 
// so we are using async function
app.post("/signup",async (req,res)=>{
    // what ever the user will enter in the name and password are going to be saved in the database 
    // {}-> this means object 
    const  data = {
        name : req.body.name,
        password : req.body.password
    }
    // now we have to give the data to mongodb to register 
    await collection.insertMany([data])
    res.render('home')


    
});







// prints this msg in the terminal if the por has been connected successfully 
app.listen(3000,()=>{
    console.log('port connected')
})






