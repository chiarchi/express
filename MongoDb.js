const uri = "mongodb://127.0.0.1:27017/test-DB";
var MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri);
const user = require("./User")

async function MongoDBconnect() {
    // we'll add code here soon


    try {
        await client.connect();

    } catch (e) {
        console.error(e);
    }
}

MongoDBconnect().catch(console.error);
const collection = client.db("test-DB");
function saveUser(user){


    collection.collection("users").insertOne(user).then(r => {
        console.error("User saved, id: " + user.id);
    });
}

function deleteUser(myquery){
    const result = client.db("test-DB").collection("users").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        if (result)
        console.log("1 document deleted" + result);
        else 
        console.log("1 document not deleted is " + result);
      });
}

function findAll(){

    const result = client.db("test-DB").collection("users").find().toArray(function(e, d) {
        console.log(d);
    });
}

exports.findAll = findAll
exports.deleteUser = deleteUser
exports.saveUser = saveUser
exports.MongoDBconnect = MongoDBconnect