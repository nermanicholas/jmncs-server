var app = require("../../app.json")
var db = require("pg");



function connect(_action) {
    var result = null;
    var pool = new db.Pool(app['postgresql']);
    pool.connect((error, client, done) => {
        if(error) {
            console.log("Error: Could not establish connection with database.");
            console.log(error);
            return null;
        }
        result = _action(client);
        done();
    })
    pool.end();
    return result;
}

function createAttraction(name, geolocation, rating, city, type, reviews) {
    if((name === null || name === "") || rating === null || typeof(rating) !== 'object' || (city === null || city === "") || (type === null || type === "")) {
        console.log("Error: Could not create attraction due to missing or incorrect data.");
        return null;
    } else {
        connect((client) => {
            client.query(app["db_queries"]["insert_attraction"], 
                name, geolocation.toString(), JSON.stringify(rating), city, type, JSON.stringify(reviews),
                (error, result) => {
                    if(error) {
                        console.log(error);
                        return null;
                    }
                }).on("row", (row, result) => {
                    return row;
            });
        })
    }
}


function updateAttraction(name, geolocation, rating, city, type, reviews) {
    if((name === null || name === "") || rating === null || typeof(rating) !== 'object' || (city === null || city === "") || (type === null || type === "")) {
        console.log("Error: Could not update attraction due to missing or incorrect data.");
        return null;
    } else {
        connect((client) => {
            client.query(app["db_queries"]["update_attraction"], 
                name, geolocation.toString(), JSON.stringify(rating), city, type, JSON.stringify(reviews),
                (error, result) => {
                    if(error) {
                        console.log(error);
                        return null;
                    }
                }).on("row", (row, result) => {
                    return row;
            });
        })
    }
}

function deleteAttraction(attraction_id) {
    console.log('implement me');
}

//checks if record exists in the attractions table and update it if necessary, if it doesn't exist then add it
function duplicateRecords(record) {
    console.log('implement me');
}


/*var test = createAttraction("Mikey's Eatery", (100, -100), {rating: 5, source: "Yelp", total: 5}, "Waterloo", "Food", [{name: "Nerman", rating: "5.0", source: "Yelp", comment: "This is awesome food!"}]);
console.log(test);
console.log('done');*/