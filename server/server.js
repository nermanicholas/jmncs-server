/* Get Together server.js
 * By: Nerman Nicholas, Michael Kang, Jade Pearce
 * Hosted on Heroku.
 * CS 446 Group 12 (jmncs)
 */

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
var http = express();

http.set('view engine', 'ejs');  //do we really need the ejs dependency?

// Get Together Server API

/* 
 * GET requests
 * 1. / => Returns successful connection message if connection was successful
 * 2. /profile => returns a user object
 * 3. /attraction/{id} => returns an attraction object
 * 4. /attraction/list => returns a list of attractions near a particular user
 * 5. 
 */

http.get('/', (request, response) => {
    response.send(200, 'Connection successful.');
});

http.get('/profile', (request, response) => {
    //retrieve user information from the body of the request
    //check whether the user is requesting their own profile object or a valid profile object (what are their permissions to see content on the profile)
    //retrieve the user object
    //format the user object into a format that can be passed back to the client
    //send the new user object back to the client
});

http.get('/attraction', (request, response) => {

});

http.get('/attraction/list', (request, response) => {
});


/* 
 * POST requests
 * 1. /register => registers the following information into the GetTogether database
 * 2. /login => returns whether the login attempt was successful or not
 * 3.
 */

http.post('/register', (request, response) => {
    //retrieve register information from the body of the request
    //check whether the information sent to register is valid
    //return success or failure message for register attempt
    response.send(200, 'Connection successful.');
});

http.post('/login', (request, response) => {7
    //retrieve login information from the body of the request
    //do a check on the login information to verify that the user's information by checking the database
    //return success or failure message for login attempt
    response.send(200, 'Connection successful.');
});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`));