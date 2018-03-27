var bodyParser = require("body-parser");
var app = require("../../app.json");
var pg = require('pg');
pg.defaults.ssl=true;

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

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

function createUser(first_name, last_name, fb_userid, email, profile_img, fb_auth_token) {
    if(first_name === null || last_name === null || fb_userid === null || profile_img === null || fb_auth_token === "") {
        console.log("Error: Could not create user due to missing or incorrect data.");
        return null;
    } else {
        var query = "INSERT INTO public.users(first_name, last_name, fb_userid, email, profile_img, fb_auth_token) \
                        VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (fb_userid) \
                        DO UPDATE SET first_name = excluded.first_name, \
                        last_name = excluded.last_name, \
                        email = excluded.email, \
                        profile_img = excluded.profile_img, \
                        fb_auth_token = excluded.fb_auth_token \
                        RETURNING *";
        var params = [first_name, last_name, fb_userid, email, profile_img, fb_auth_token];
        return connect({sql: query, values: params});
    }
}

function deleteUser(attraction_id) {
    if(user_id === null) {
        console.log("Error: Could not delete user due to incorrect ID.");
        return null;
    } else {
        return connect({sql: app.db_queries.delete_user, values: [attraction_id]});
    }
}
