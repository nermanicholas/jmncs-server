var Yelp = require('yelp-fusion');
var app = require('../../app.json');
var attractions = require('../models/attractions');
var yelp = Yelp.client(app.yelp_user.api_key);


//records = amount of items you want added to the database
function addData(records) {
    yelp.search({ term: 'food', location: 'Waterloo'}).then(data => {
        data['businesses'].forEach(result => {
            records.add(attractions.createAttraction(result['name'], (result['coordinates']['longitude'],result['coordinates']['latitude']), {rating: result['rating'], total: 5, source: 'Yelp'}, 'Waterloo', 'food', []));
        });
        return records;
    }).catch(error => {
        console.log(error);
        return null;
    });
}

