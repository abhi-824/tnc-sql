require("dotenv").config();

const Pool = require("pg").Pool;
var pg = require("pg");
var fs = require("fs");
var sql = fs.readFileSync("init.sql").toString();

pg.connect(process.env.DATABASE_URL, function (err, client, done) {
  client.query(sql);
  done();
});
const url = require("url");
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(":");
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
};

const pool = new Pool(config);
module.exports = {
  pool,
};
