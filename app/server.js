/* Get Together server.js
 * By: Nerman Nicholas, Michael Kang, Jade Pearce
 * Hosted on Heroku.
 * CS 446 Group 12 (jmncs)
 */

const app = require('../app.json');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
var users = require('./models/users');
var events = require('./models/events');
var attractions = require('./models/attractions');
var http = express();
var bodyParser = require('body-parser');

http.use(bodyParser.json());
http.use(bodyParser.urlencoded({
    extended: true
}));
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
    var result = {
        userid: 1,
        phone_number: 9053990223,
        first_name: 'Michael',
        last_name: 'Kang',
        profile_url:'https://scontent.fyzd1-1.fna.fbcdn.net/v/t31.0-8/22426246_10155760490002964_7691357498054086805_o.jpg?oh=c3586afce9dfff9c8ce53e443b2c57b5&oe=5B0F9969',
        email:'michael_kang@outlook.com',
        auth_token:'EAAYmthAja4IBAKw7SujjRvtIxhADig9yGDZAD08VMK6nwpZAnhioglPkbUUy3nZAJYBZCFOZBfLkLFvwW9366VScgir4nUUsqSAPYIsRxkMPaoiux2ZAJzrBXvnrseIIG1qzAtBZAasL4Bn62mMCQZCBIxhcLYChAhF3bFt5Nblg6EFtt3E9wpqXDnWzF4DbZCyr2fZCHxBxCkIvAM84kNQqPZAc3iTagJyzovkcW2dZAMB7qwZDZD',
        created: Date.now(),
        last_login: Date.now()
    };
    response.send(200, JSON.stringify(result));
});

http.get('/attraction', (request, response) => {
    var result = {
        name: 'Mikey\'s Eatery',
        latitude: 43.4721651,
        longitude: -80.5384285,
        rating: 5.0,
        city: 'Waterloo',
        distance: 0.5,
        type: 'food',
        id: 1
    };
    response.send(200, JSON.stringify(result));
});

http.get('/attraction/list', (request, response) => {
    var result = [
        {
            name: 'Mikey\'s Eatry',
            latitude: 43.4721651,
            longitude: -80.5384285,
            rating: 4.0,
            city: 'Waterloo',
            distance: 0.6,
            type: 'food',
            id: 1
        },
        {
            name: 'Burger King',
            latitude: 43.4721651,
            longitude: -80.5384285,
            rating: 3.5,
            city: 'Waterloo',
            distance: 0.8,
            type: 'food',
            id: 2
        },
        {
            name: 'Lazeez',
            latitude: 43.4721651,
            longitude: -80.5384285,
            rating: 4.8,
            city: 'Waterloo',
            distance: 0.4,
            type: 'food',
            id: 3
        },
    ];
    response.send(200, JSON.stringify(result));
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
    var first_name = request.body.first_name,
        last_name = request.body.last_name,
        id = request.body.id,
        email = request.body.email,
        pic = request.body.picture.data.url,
        auth = request.body.auth;

    users.createUser(first_name, last_name, id, email, pic, auth);
    console.log(request.body);
    console.log(request.body.picture.data.url);
    // var result = {
    //     userid: 1,
    //     phone_number: 9053990223,
    //     first_name: 'Michael',
    //     last_name: 'Kang',
    //     profile_url:'https://scontent.fyzd1-1.fna.fbcdn.net/v/t31.0-8/22426246_10155760490002964_7691357498054086805_o.jpg?oh=c3586afce9dfff9c8ce53e443b2c57b5&oe=5B0F9969',
    //     email:'michael_kang@outlook.com',
    //     auth_token:'',
    //     created: Date.now(),
    //     last_login: Date.now()
    // };

    // if(request.body != null) {
    //     if(request.body.first_name === "Michael" &&
    //     request.body.last_name === "Kang" &&
    //     request.body.profile_url !== "" &&
    //     request.body.email === "michael_kang@outlook.com") {
    //         result.profile_url = request.body.profile_url;
    //         result.auth_token = reqeust.body.auth_token;
    //         var wrapper = {user: result, message: "Registration successful"};
    //         response.send(200, JSON.stringify(wrapper));
    //     }
    //     else {
    //         response.send(400, "Incorrect info when registering.");
    //     }
    // }
    // response.send(500, 'Server error retrieving request.');
});

http.post('/login', (request, response) => {
    //retrieve login information from the body of the request
    //do a check on the login information to verify that the user's information by checking the database
    //return success or failure message for login attempt
    
    //STATUS: INCOMPLETE

    if(request.body != null) {
        if(request.body.first_name === "Michael" &&
        request.body.last_name === "Kang" &&
        request.body.profile_url !== "" &&
        request.body.email === "michael_kang@outlook.com") {
            result.profile_url = request.body.profile_url;
            result.auth_token = reqeust.body.auth_token;
            var wrapper = {user: result, message: "Registration successful"};
            response.send(200, JSON.stringify(wrapper));
        }
        else {
            response.send(400, "Incorrect info when logging in.");
        }
    }
    response.send(500, 'Server error retrieving request.');
});

http.post('/events', (request, response) => {
    var name = request.body.name,
        attractionId = request.body.attractionId,
        id = request.body.id,
        attractionName = request.body.attractionName,
        dates = request.body.dates,
		startTimes = request.body.startTimes,
		endTimes = request.body.endTimes,
        owner_id = request.body.ownser_id
		friends = request.body.friends,
		friendId = request.body.friendId,
		eventStatus = request.body.eventStatus,
		votes = request.body.votes;

    events.createEvent(name, attractionId, id, attractionName, dates, startTimes, endTimes, owner_id, friends, friendId, eventStatus, votes);
    console.log(request.body);

});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`));

