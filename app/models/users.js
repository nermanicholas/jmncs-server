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

function createUser(first_name, last_name, fb_userid, email, phone_number, profile_img, availability, fb_auth_token) {
    if(first_name === null || last_name === null || fb_userid === null || profile_img === null || availability === null || fb_auth_token === "") {
        console.log("Error: Could not create user due to missing or incorrect data.");
        return null;
    } else {
        connect((client) => {
            client.query(app["db_queries"]["insert_user"], 
                fb_userid, first_name, last_name, email, phone_number, profile_img, availability, fb_auth_token,
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


function updateUser(first_name, last_name, fb_userid, email, phone_number, profile_img, availability, fb_auth_token) {
    if((name === null || name === "") || rating === null || typeof(rating) !== 'object' || (city === null || city === "") || (type === null || type === "")) {
        console.log("Error: Could not update user due to missing or incorrect data.");
        return null;
    } else {
        connect((client) => {
            client.query(app["db_queries"]["update_user"], 
            fb_userid, first_name, last_name, email, phone_number, profile_img, availability, fb_auth_token,
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

function deleteUser(attraction_id) {
    console.log('implement me');
}