var bodyParser = require("body-parser");
var app = require("../../app.json");
var pg = require('pg');
pg.defaults.ssl=true;

function createEvent(name, attractionId, attractionName, dates, startTimes, endTimes, owner_id, friends, friendId, eventStatus, votes) {
    if(owner_id === null || name === null || attractionId === null || attractionName === null || eventStatus === null, friendId == null) {
        console.log("Error: Could not create event due to missing or incorrect data.");
        return null;
    } else {
        var response = null;
        var cn = 'postgres://jsxsnawiawgkxp:d942d97663ae984e9048fdcab5df5afd303e74fd20ac3ce7f8782fcccc271e29@ec2-54-225-249-161.compute-1.amazonaws.com:5432/df5u1ks7mi2i34';
        var client = new pg.Client(cn);
        client.connect();
        var query = app.db_queries.insert_event;
        var params = [name, attractionId, attractionName, dates, startTimes, endTimes, owner_id, friends, friendId, eventStatus, votes];
        client.query(query, params, (err, res) => {
        if (err) {
            console.log(err.stack)
          } else {
            console.log(res.rows[0])
          }
        });
        client.end();
    }
}

module.exports.createEvent = createEvent;
