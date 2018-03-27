var bodyParser = require("body-parser");
var app = require("../../app.json");
var pg = require('pg');
pg.defaults.ssl=true;

function createUser(first_name, last_name, fb_userid, email, profile_img, fb_auth_token) {
    if(first_name === null || last_name === null || fb_userid === null || profile_img === null || fb_auth_token === "") {
        console.log("Error: Could not create user due to missing or incorrect data.");
        return null;
    } else {
        var cn = 'postgres://jsxsnawiawgkxp:d942d97663ae984e9048fdcab5df5afd303e74fd20ac3ce7f8782fcccc271e29@ec2-54-225-249-161.compute-1.amazonaws.com:5432/df5u1ks7mi2i34';
        var client = new pg.Client(cn);
        client.connect();
        var query = app.db_queries.insert_user;
        var params = [first_name, last_name, fb_userid, email, profile_img, fb_auth_token];
        client.query(query, params, (err, res) => {
        if (err) {
            console.log(err.stack)
          } else {
            console.log(res.rows[0])
          }
        });
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

module.exports.createUser = createUser;
