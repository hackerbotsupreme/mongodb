// video 1- 15
// change the directory to the root directory of the project 

// before anything (i mean any module/package to install ) to keep track and to maintain it  we have to make the package.json 
// using npm init 

// first  we have to install mongoose(npm i mongoose) on our local system 
// then we will import it as a variable to use it .

// now , 

// connection creation with new database 
const mongoose = require("mongoose");
//  mongoose have a method named which   connects the myapp database running locally on the default port (27017)
// this is where i was stuck previously 
mongoose.connect('mongodb://127.0.0.1:27017/AlokeDatabase').then(
  () => { console.log("connection is sucessful.........with compass") /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
  err => { console.log(err)/** handle initial connection error */ }
);
// now keepin mind that this part returns a promise (promise means it will return some data in future )
// 'mongodb://127.0.0.1:27017/AlokeDatabase'
// at first this AlokeDatabase database will not be shown bcz in mongodb the databases 
// is not displayed untill it have at least one documents .


// establish the database with nodemon src/app.js or node src/app.js


// models and schema in mongoose 

// schema 
//  a mongoose schema defines the structure of the document . 
// default values , validators , etc ... 
// so defining document structure 
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
})


// a mongoose model is a wrapper on the mongoose schema . 
// a mongoose schema defines the structure of the document . 
// default values , validators , etcc.. , whereas a mongoose model 
// provides an interface to the database  for creating , quering , updating , deleting records etc. 

//  creating collection 
const Playlist = new mongoose.model("playlist", playlistSchema)


// create our document / insert the document 

// adding multiple documents 
const createDocument = async () => {
  try {
    const jsPlaylist = new Playlist({
      name: "javascript",
      ctype: "front end",
      videos: 150,
      author: "Thapa Technical",
      active: true
    })
    // camelcase convention 
    const mongodbPlaylist = new Playlist({
      name: "mongodb js ",
      ctype: "Database",
      videos: 10,
      author: "Thapa Technical",
      active: true
    })
    const mongoosePlaylist = new Playlist({
      name: "mongoose js ",
      ctype: "Database",
      videos: 5,
      author: "Thapa Technical",
      active: true
    })
    const expressPlaylist = new Playlist({
      name: "Express js ",
      ctype: "Backend",
      videos: 20,
      author: "Thapa Technical",
      active: true
    })
    // so we created four documents , and its time to use insertMany 
    // saving it 
    // const result = await recentPlaylist.save();
    const result = await Playlist.insertMany([expressPlaylist, mongoosePlaylist, mongodbPlaylist, jsPlaylist]);
    // note insertMany takes an array so we ill pass all the four documents as array 
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}

// we arec checking / confirming its done 

// now just disconnect and reconnect the compass 
// and i will recommand not to use nodemon bcz its gonna add the same document repeatedly whenever we save 
//  so use node src/app.js instead 

// now note that .save() method reurns a promise ,
// our program is saying that create it and insert it but in the backend its an async process 
// so we do 
// const result = await recentPlaylist.save();


// function call 
// createDocument(); // used when we are doing one by one 


// so promise is batter than save and try catch is better then promise .

//  and the last thing is when uou are working with async await always
// try to use try and catch block 


const getDocument = async () => {
  try {
    // const result = await Playlist.find();
    // passing query 
    // const result = await Playlist.find({ctype: "front end"});
    // now  only want to show name 
    // const result = await Playlist.find({ctype: "front end"}).select({name:1});
    // an we can also use limits 
    const result = await Playlist.find({ ctype: "front end" }).select({ name: 1 }).limit(1);
    console.log(result)
    // all we learned in cmd is also same here 
  } catch (err) {
    console.log(err);
  }
}

getDocument();



// boom there is the reult
// PS C:\Users\rekha\OneDrive\Desktop\mongoDB\core\mongodb-tutorial-in-hindi-thapa-technical\mongoose-video11> node src/app.js
// connection is sucessful.........with compass
// {
//   name: 'node js ',
//   ctype: 'back end',
//   videos: 90,
//   author: 'Aloke',
//   active: true,
//   _id: new ObjectId('654782dad10efc66bb1712ec'),
//   date: 2023-11-05T11:56:10.945Z,
//   __v: 0
// }






// after inserting all four document
// PS C:\Users\rekha\OneDrive\Desktop\mongoDB\core\mongodb-tutorial-in-hindi-thapa-technical\mongoose-video11> node src/app.js
// connection is sucessful.........with compass
// [
//   {
//     name: 'Express js ',
//     ctype: 'Backend',
//     videos: 20,
//     author: 'Thapa Technical',
//     active: true,
//     _id: new ObjectId('6547883fc7a9db3deca68ab0'),
//     date: 2023-11-05T12:19:11.520Z,
//     __v: 0
//   },
//   {
//     name: 'mongoose js ',
//     ctype: 'Database',
//     videos: 5,
//     author: 'Thapa Technical',
//     active: true,
//     _id: new ObjectId('6547883fc7a9db3deca68aaf'),
//     date: 2023-11-05T12:19:11.519Z,
//     __v: 0
//   },
//   {
//     name: 'mongodb js ',
//     ctype: 'Database',
//     videos: 10,
//     author: 'Thapa Technical',
//     active: true,
//     _id: new ObjectId('6547883fc7a9db3deca68aae'),
//     date: 2023-11-05T12:19:11.518Z,
//     __v: 0
//   },
//   {
//     name: 'javascript',
//     ctype: 'front end',
//     videos: 150,
//     author: 'Thapa Technical',
//     active: true,
//     _id: new ObjectId('6547883fc7a9db3deca68aad'),
//     date: 2023-11-05T12:19:11.515Z,
//     __v: 0
//   }
// ]
