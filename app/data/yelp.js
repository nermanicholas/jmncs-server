var Yelp = require('yelp');
var app = require('../../app.json');
var attractions = require('../models/attractions');
var yelp = new Yelp(app['yelp_access']);


//records = amount of items you want added to the database
function addData(records) {
    yelp.search({ term: 'food', location: 'Waterloo'}).then(data => {
        data['businesses'].forEach(result => {

            //call a method from the attractions model to perform a duplication check on the data

            attractions.createAttraction(result['name'], (result['coordinates']['longitude'],result['coordinates']['latitude']), {rating: result['rating'], total: 5, source: 'Yelp'}, 'Waterloo', 'food', []);
        });
    }).catch(error => {
        console.log(error);
        return null;
    });
}