const pool = require("../../pool")
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
