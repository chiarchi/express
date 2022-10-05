const express = require("express");

const app = express();

const mongoDB = require("./MongoDb")

const producer = require("./rabbit/Producer")
const consumer = require("./rabbit/Consumer")

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes"));

app.listen(3000, () => console.log('Server started'));

const fs = require("fs");
const { User } = require("./User");

