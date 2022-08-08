require("dotenv").config();
const Pool = require("pg").Pool;

const url = require("url");
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(":");
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  ssl: true
};

const pool = new Pool(config);


var fs = require('fs');

var sql = fs.readFileSync('init.sql').toString();
pool.connect(function(err, client, done){
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
