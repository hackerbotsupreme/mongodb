// note here we are getting data using node and mongodb or in other words using 
// backend and database 

//  here first we are making connection with the server and then with the database 
// then we can access the collection 

// Getting Started with Node.js MongoDB Driver
// It's an Object Data Modeling (ODM) library for 
// MongoDB and Node.js.
// It makes MongoDB interaction more 
// straightforward and organized.
// It provides a structured, schema-based data 
// modeling approach.

// and note in this we have no schema , so this is basically  unstructured or semi-structured 
// but we can create schema when we are working with mongoose 

//  so i have done my node and mongodb 
// so now we will write our program for out application 

const { MongoClient } = require("mongodb");
// type npm init -y to create the package.json

// C:\Users\rekha\OneDrive\Desktop\mongo\products.json
// C:\Users\rekha\OneDrive\Desktop\mongoDB\2.Thapa Technical MongoDB Import Files\products.json
// C:\Users\rekha\OneDrive\Desktop\mongoDB\mongo_thapa_course\mongoose_node
// we are connecting to the localhost means local server of out terminal/cmd
const uri = "mongodb://127.0.0.1";

// makinng connection with the mongodb server 
const client = new MongoClient(uri);

const data1 = {
  name: "Designer Handbag1",
  company: "64c23350e32f4a51b19b923a",
  price: 3466,
  colors: ["#000000", "#cc6600", "#663300"],
  image: "/images/product-handbag.png",
  category: "64c2342de32f4a51b19b9250",
  isFeatured: true,
};

const main = async () => {
  // connect with 
  await client.connect();
  // connect with database 
  const db = client.db("shop");
  const collection = db.collection("products");

  await collection.insertOne(data1);

  const data = await collection.find({ price: { $eq: 3466 } }).toArray();

  console.log(data);
  return "done";
};

main()
  .then(console.log())
  .catch((e) => console.log(e))
  .finally(() => client.close());
// C:\Users\rekha\OneDrive\Desktop\mongoDB\mongo_thapa_course\mongo_node
// open the terminal and  go to  npm mongodb Node.js driver



