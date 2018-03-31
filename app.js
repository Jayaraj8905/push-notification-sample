const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname + '/app')));

const PORT = process.env.PORT || 5000;
app.listen(PORT);