// the first job is to run the file  to run it go to the root folder node src/app.js or nodemon sec/app.js simply choose nodemon as it automatically update the changes 
// but before running the command add "dev":"nodemon src/app.js" inside the scripts 
// now run npm run dev 
//  and to run the file we need to configure the file 

const express = require('express')
const app = express();
// now express is imported and app has all the methods and properties of express 
const port = process.env.PORT || 3000;


// "/" -> this represents the hhome page 
app.get("/",(req,res)=>{
    res.send('i am aloke')
})
// and we need to listen to the server port no.
app.listen(port , ()=>{
    console.log(`server is running at port num 3000 ${port}`)
})
// if we choose 2000,3000 port number then it will be limited to our local machine 
// but what i need is to host it such if anybody visits then it generated a port number automatically 
// SO WE  did const port = process.env.PORT|| 3000;
// this ensures if we are hosting then above phenomenon will occour and if its localhost then its 3000 