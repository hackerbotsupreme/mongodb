//  video 20
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/AlokeDatabase').then(
  () => { console.log("connection is sucessful.........with compass") },
  err => { console.log(err) }
);

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,// means this field can not be empty  
    unique: true,
    trim: true,
    minlength: [2, 'minimum 2 letters'],
    maxlength: 30,
    // interview question , unique option is a validator or not ?
    // go to internet 
    // lowercase:true,
    uppercase: true,
  },
  ctype: {
    type: string,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"]
    // enum: {Array}
    // Creates an enum validator. If the value being set is not in this array, validation will fail.
  },
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
})

const Playlist = new mongoose.model("playlist", playlistSchema)

const createDocument = async () => {
  try {
    // const jsPlaylist = new Playlist({
    //   name: "javascript",
    //   ctype: "front end",
    //   videos: 150,
    //   author: "Thapa Technical",
    //   active: true
    // })
    // camelcase convention 
    // const mongodbPlaylist = new Playlist({
    //   name: "mongodb js ",
    //   ctype: "Database",
    //   videos: 10,
    //   author: "Thapa Technical",
    //   active: true
    // })
    const mongoosePlaylist = new Playlist({
      // name: "MongoOse js",
      // name: "mongoose js",
      // name: "j",
      // name: "j",
      // go to https://mongoosejs.com/docs/2.7.x/docs/schematypes.html
      // name: "               MongoOse      js                ",
      name: "mongoose js",
      // ctype: "Database",s
      // ctype: "uu/ux",// not a valid enum value 
      ctype: "database",
      videos: 5,
      author: "Thapa Technical",
      active: true
    })
    // const expressPlaylist = new Playlist({
    //   name: "Express js ",
    //   ctype: "Backend",
    //   videos: 20,
    //   author: "Thapa Technical",
    //   active: true
    // })
    // const result = await Playlist.insertMany([expressPlaylist, mongoosePlaylist, mongodbPlaylist, jsPlaylist]);
    const result = await Playlist.insertMany([mongoosePlaylist]);
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}
createDocument();
const getDocument = async () => {
  try {
    const result = await Playlist.find({ $and: [{ ctype: "back end" }, { author: "Thapa Technical" }] }).sort({ name: -1 });
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}
const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate({ _id }, {
      $set: {
        name: "javascript"
      }
    }, {
      new: true,
      useFindAndModify: false,
    }
    );
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id })
    console.log(result)//it will show how many documents are deleted 
  } catch (err) {
    console.log(err);
  }
}

// delete query
// deleteDocument("65477e59bad18580f7b8dd70")
