// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get('/',(req,res) =>{
  res.sendFile(path.join(__dirname, "./public/index.html"));
} )

module.exports = app;
app.listen(PORT,()=>{
  console.log('connected')
})