var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../dist'));
app.use(express.static(__dirname));

app.listen(3000);

console.log("Demos:")
console.log(" * http://localhost:3000/balls/")
console.log(" * http://localhost:3000/invaders/")
