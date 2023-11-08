// upto video 17
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
    // mongodb comparison advanced query operators 
    // goto https://www.mongodb.com/docs/manual/reference/operator/query/  forll all the queries 
    // const result = await Playlist.find({ ctype: "front end" }).select({ name: 1 }).limit(1);
    // now i want to see the documents which have more than  40 documents - usecase of greater then $gt
    // const result = await Playlist.find({ videos : {$gt : 30}}).select({ name: 1 });
    // now i want to see all of them whichare greater than or equal to 30 
    // const result = await Playlist.find({ videos : {$gte : 30}}).select({ name: 1 });
    // for less than
    // const result = await Playlist.find({ videos : {$lte : 30}}).select({ name: 1 });
    // i want to findout all the documents which have back"backendend + database 
    // const result = await Playlist.find({ ctype : {$in  : ["back end","database"]}}).select({ name: 1 });


    // mongoose query logical operators , for  logical operators go to (and , not ,nor , or )
    // https://www.mongodb.com/docs/manual/reference/operator/query-logical/
    // const result = await Playlist.find( {$or  : [{ctype:"back end"},{author:"Thapa Technical"}]}).select({ name: 1 });
    // for and operator 
    // const result = await Playlist.find( {$and  : [{ctype:"back end"},{author:"Thapa Technical"}]}).select({ name: 1 });
    // suppose we want that  author thapa technical  and the course is backend how many (count ) documents are there ?
    // const result = await Playlist.find( {$and  : [{ctype:"back end"},{author:"Thapa Technical"}]}).countDocuments();
    // we want to sort in ascending order 
    // const result = await Playlist.find( {$and  : [{ctype:"back end"},{author:"Thapa Technical"}]}).sort({name:1});
    // we want in descenfing order 
    const result = await Playlist.find( {$and : [{ctype:"back end"},{author:"Thapa Technical"}]}).sort({name:-1});
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}
// reading / quering the documents using mongoose (video 16)
getDocument();


// You can use operators when querying your data with mongosh methods, the Atlas UI, or Compass.
// Query Selectors
// Comparison

// For comparison of different BSON type values, see the specified BSON comparison order.
// Name
// Description
// $eq
// Matches values that are equal to a specified value.
// $gt
// Matches values that are greater than a specified value.
// $gte
// Matches values that are greater than or equal to a specified value.
// $in
// Matches any of the values specified in an array.
// $lt
// Matches values that are less than a specified value.
// $lte
// Matches values that are less than or equal to a specified value.
// $ne
// Matches all values that are not equal to a specified value.
// $nin
// Matches none of the values specified in an array.
// Logical
// Name
// Description
// $and
// Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
// $not
// Inverts the effect of a query expression and returns documents that do not match the query expression.
// $nor
// Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
// $or
// Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
// Element
// Name
// Description
// $exists
// Matches documents that have the specified field.
// $type
// Selects documents if a field is of the specified type.
// Evaluation
// Name
// Description
// $expr
// Allows use of aggregation expressions within the query language.
// $jsonSchema
// Validate documents against the given JSON Schema.
// $mod
// Performs a modulo operation on the value of a field and selects documents with a specified result.
// $regex
// Selects documents where values match a specified regular expression.
// $text
// Performs text search.
// $where
// Matches documents that satisfy a JavaScript expression.
// Geospatial
// Name
// Description
// $geoIntersects
// Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.
// $geoWithin
// Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.
// $near
// Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.
// $nearSphere
// Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere.
// Array
// Name// Description
// $all
// Matches arrays that contain all elements specified in the query.
// $elemMatch
// Selects documents if element in the array field matches all the specified $elemMatch conditions.
// $size
// Selects documents if the array field is a specified size.
// Bitwise
// Name
// Description
// $bitsAllClear
// Matches numeric or binary values in which a set of bit positions all have a value of 0.
// $bitsAllSet
// Matches numeric or binary values in which a set of bit positions all have a value of 1.
// $bitsAnyClear
// Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
// $bitsAnySet
// Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
// Projection Operators
// Name
// Description
// $
// Projects the first element in an array that matches the query condition.
// $elemMatch
// Projects the first element in an array that matches the specified $elemMatch condition.
// $meta// Projects the document's score assigned during $text operation.
// $slice
// Limits the number of elements projected from an array. Supports skip and limit slices.
// Miscellaneous Operators
// Name
// Description
// $comment
// Adds a comment to a query predicate.
// $rand
// Generates a random float between 0 and 1.