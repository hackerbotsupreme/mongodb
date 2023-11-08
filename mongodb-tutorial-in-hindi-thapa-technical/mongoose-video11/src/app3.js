// from video 18 and 19
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/AlokeDatabase').then(
  () => { console.log("connection is sucessful.........with compass") },
  err => { console.log(err) }
);

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

const Playlist = new mongoose.model("playlist", playlistSchema)

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
    const result = await Playlist.insertMany([expressPlaylist, mongoosePlaylist, mongodbPlaylist, jsPlaylist]);
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}

const getDocument = async () => {
  try {
    const result = await Playlist.find({ $and: [{ ctype: "back end" }, { author: "Thapa Technical" }] }).sort({ name: -1 });
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}


// getDocument();

// update documents using mongoose 
// go to https://www.mongodb.com/docs/manual/reference/operator/update/
const updateDocument = async (_id) => {
  try {
    // const result = await Playlist.updateOne({ _id }, {
    //   // https://www.mongodb.com/docs/manual/reference/operator/update/
    //   $set: {
    //     name: "javascript"
    //   }
    // });


    //here we want to see thw whole document , so we replaced  updateOne with findIdAndUpdate
    const result = await Playlist.findByIdAndUpdate({ _id }, {
      // https://www.mongodb.com/docs/manual/reference/operator/update/
      // filter , update ,options 
      $set: {
        name: "javascript"
      }},{
        new:true,// search it in mongoose to know more 
        // to show the new updated property in the console 
        useFindAndModify:false,
        // note that useFindAndModify this method shows previous data in the console not the updated one 
      }
    );
  console.log(result)
  } catch (err){
  console.log(err)
}
}

// we are updating the document with 65477e59bad18580f7b8dd70 id 
// updateDocument('65477e59bad18580f7b8dd70')

const deleteDocument =async (_id)=>{
  try {
    // to delete one document 
    // const result = await Playlist.deleteOne({_id})//followinf the ecmascript syntax
    // to delete many  documents 
    // const result = await Playlist.deleteMany({_id})
    // using findByIdAndDelete
    // the only difference is it displays the whole document in console which  we deleted 
    const result = await Playlist.findByIdAndDelete({_id})
    console.log(result)//it will show how many documents are deleted 
  } catch (err) {
    console.log(err);
  }
}

// delete query 
deleteDocument("65477e59bad18580f7b8dd70")
