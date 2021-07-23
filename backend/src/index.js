const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
var path    = require("path");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enabling CORS
app.use(cors());

// indent prettified JSON
app.set('json spaces', 2);

/* 
 * homepage 
 */
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/static/index.html'));
}); 

// routes
app.use('/', routes);

// error handlers 
app.use(function (err, req, res, next) {
    if (err) {
      res.status(500).send(err);
      return;
    }
}); 

// listen port
app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));