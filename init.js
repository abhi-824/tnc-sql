var pg = require('pg');
var fs = require('fs');

var sql = fs.readFileSync('init.sql').toString();

pg.connect(process.env.DATABASE_URL, function(err, client, done){
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    client.query(sql, function(err, result){
        done();
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        process.exit(0);
    });
});
