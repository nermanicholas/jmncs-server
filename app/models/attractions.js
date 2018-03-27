var bodyParser = require("body-parser");
var app = require("../../app.json");
var pg = require('pg');
pg.defaults.ssl=true;

module.exports.createAttraction = createAttraction;
module.exports.updateAttraction = updateAttraction;
module.exports.deleteAttraction = deleteAttraction;

function connect(query) {
    var response = null;
    var pool = new pg.Pool(app.postgres_db_user);
    var promise = new Promise((resolve, reject) => {
        pool.query(query.sql, query.values, (err, res) => {
            if (err) {
                response = err.stack;
                console.log(err.stack);
                reject(err);
            } else {
                resolve(res);
                response = res;
            }
        });
    });

    return promise.then(result => {
        pool.end();
        return response;
    });
}

function attractionExists(attraction) {
    var sql = "SELECT id, yelp_id, geolocation, rating, city, type, reviews FROM public.attractions WHERE yelp_id=$1";
    var query = { sql: sql, values: [attraction.yelp_id]};
    
    return connect(query).then((result) => {
        for(var row of result.rows) {
            if(attraction.yelp_id.toString() === row.yelp_id) {
                return parseInt(row.id);
            }
        }
        return false;
    });
}

function createAttraction(yelp_id, name, geolocation, rating, city, type, reviews) {
    if((yelp_id === null || yelp_id === "") || (name === null || name === "") || rating === null || typeof(rating) !== 'object' || (city === null || city === "") || (type === null || type === "")) {
        console.log("Error: Could not create attraction due to missing or incorrect data.");
        return null;
    } else {
        return attractionExists({yelp_id: yelp_id, name: name, geolocation: geolocation, rating: rating, city: city, type: type}).then((val) => {
            if(typeof(val) === "integer") {
                return updateAttraction(val, yelp_id, name, geolocation, rating, city, type, reviews, false);
            } else if(typeof(val) === "boolean") {
                var query = { sql: app.db_queries.insert_attraction, values: [yelp_id, name, '(' + geolocation[0] + ',' + geolocation[1] +')', rating, city, type, reviews]};
                return connect(query);
            }
        });
    }
}


function updateAttraction(id, yelp_id, name, geolocation, rating, city, type, reviews, duplicateCheck=true) {
    if(id===null || yelp_id === null || name === null || rating === null || city === null || type === null) {
        console.log("Error: Could not update attraction due to missing or incorrect data.");
        return null;
    } else {
        if(duplicateCheck) {
            return attractionExists({yelp_id: yelp_id, name: name, geolocation: geolocation, rating: rating, city: city, type: type}).then((result)=>{
                if(typeof(result) === "boolean") {
                    var query = { sql: app.db_queries.insert_attraction, values: [yelp_id, name, '(' + geolocation[0] + ',' + geolocation[1] +')', rating, city, type, reviews]};
                    return connect(query);
                } else {
                    var sql = "UPDATE public.attractions SET yelp_id=$7, name=$1, geolocation=$2, rating=$3, city=$4, type=$5, reviews=$6 WHERE yelp_id=$7";
                    var query = { sql: sql, values: [name, '(' + geolocation[0] + ',' + geolocation[1] +')', rating, city, type, reviews, yelp_id]};
                    return connect(query);
                }
            });
        } else {
            var query = { sql: app.db_queries.insert_attraction, values: [yelp_id, name, '(' + geolocation[0] + ',' + geolocation[1] +')', rating, city, type, reviews]};
            return connect(query);
        }
    }
}

function deleteAttraction(attraction_id) {
    if(attraction_id === null || attraction_id === "") {
        console.log("Error: Could not delete attraction due to incorrect ID.");
        return null;
    } else {
        var query = {sql: app.db_queries.delete_attraction, values: [attraction_id]};
        return connect(query);
    }
}
