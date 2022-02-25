require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.PASSWORD,
  port: 5432,
});
const getProducts = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM \"PRODUCT\" ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getProductsById = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT * FROM \"PRODUCT\" WHERE \"id\"=${id}`, (error, results) => {
      if (error) {
        console.log(error)
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = {
  getProducts,
  getProductsById
};
