var bodyParser = require("body-parser");
var app = require("../../app.json");
var pg = require('pg');
pg.defaults.ssl=true;

function createAttraction(name, geolocation, rating, city, type, reviews) {
    if((name === null || name === "") || rating === null || typeof(rating) !== 'object' || (city === null || city === "") || (type === null || type === "")) {
        console.log("Error: Could not create attraction due to missing or incorrect data.");
        return null;
    } else {
        var response = null;
        var cn = 'postgres://jsxsnawiawgkxp:d942d97663ae984e9048fdcab5df5afd303e74fd20ac3ce7f8782fcccc271e29@ec2-54-225-249-161.compute-1.amazonaws.com:5432/df5u1ks7mi2i34';
        var client = new pg.Client(cn);
        client.connect();
       
        //return response;
        /*
        const client = new db.Client({
            connectionString: app.connection_string,
            ssl: true
        });
        client.ssl = true;
        client.connect();
        client.ssl = true;
        const query = client.query(app.db_queries.insert_attraction, [name, geolocation.toString(), rating.toString(), city, type, reviews.toString()]);
        query.on('end', (error, result) => {
            response = result;
            client.end();
        }).then(() => {
            return response;
        });*/
    }
}


function updateAttraction(name, geolocation, rating, city, type, reviews) {

}

function deleteAttraction(attraction_id) {
    console.log('implement me');
}

//checks if record exists in the attractions table and update it if necessary, if it doesn't exist then add it
function duplicateRecords(record) {
    console.log('implement me');
}


var test = createAttraction("Mikey's Eatery", (100, -100), {rating: 5, source: "Yelp", total: 5}, "Waterloo", "Food", [{name: "Nerman", rating: "5.0", source: "Yelp", comment: "This is awesome food!"}]);
console.log(test);
console.log('done');