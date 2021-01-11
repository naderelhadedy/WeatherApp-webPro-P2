// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=> {
  console.log(`server is running on localhost: ${port}`);
});


//get route
app.get('/allData', (request, response) => {
  response.send(projectData);
});


//post route
app.post('/addInfo', (req, res) => {

  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  projectData.date = req.body.date;

});