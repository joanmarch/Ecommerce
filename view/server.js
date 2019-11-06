//server.js
const express = require('express');

// comment the next line out if you don't want favicon
const favicon = require('express-favicon'); 
// if you want to have a favicon
// favicon.ico goes to /public folder to replace the original one from React

const path = require('path');
const port = process.env.PORT || 3003;
const app = express();

//comment this out if you don't use favicon
app.use(favicon(__dirname + '/build/favicon.ico'));


// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);