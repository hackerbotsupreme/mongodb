// from video 21
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/AlokeDatabase',
// {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}
).then(
  () => { console.log("connection is sucessful.........with compass") },
  err => { console.log(err) }
);

const playlistSchema = new mongoose.Schema({

  // previously we have seen the built in  validation in this video (21) we will see  the custom validation 

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'minimum 2 letters'],
    maxlength: 30,
    uppercase: true,
  },
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"]
  },
  // videos: Number,
  // note that use user also can give -1 but the number of videos can not be -1 so we will restrict it using custom validation 
  // go to https://mongoosejs.com/docs/validation.html
  videos : {
    type:Number ,
    validate(value){
      if(value<0){
        throw new Error("videos count should not be negative")
      }
    }
  },
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
    const mongoosePlaylist = new Playlist({
      name: "mongoose js",
      ctype: "database",
      // videos: 5,
      // videos: -5,
      videos: 5,
      author: "Thapa Technical",
      active: true
    })
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
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}

