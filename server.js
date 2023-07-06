require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3005;
const routes = require("./routes/index")
const mongoose = require("mongoose");


//middleware
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch(err => console.log(err));

async function main() {
    console.log('start of main')
    await mongoose.connect('mongodb+srv://Fauzia91:Emily121391@cluster0.fzi3ssv.mongodb.net/?retryWrites=true&w=majority');
}


app.use("/api", routes);

app.listen(port, ()=>{
    console.log("Listening on port " + port)
})