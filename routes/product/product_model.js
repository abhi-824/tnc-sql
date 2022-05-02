const pool = require("../../pool").pool;
const getProducts = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "PRODUCT" ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getProductsById = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM \"PRODUCT\" WHERE \"id\"=${id}`,
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        // console.log(id,results.rows);
        resolve(results.rows);
      }
    );
  });
};

const createProduct = (body) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `INSERT INTO \"PRODUCT\" (\"title\",\"price\",\"photoURL\",\"size\",\"categoryId\",\"description\","userId") VALUES ('${body.title}',${body.price},'${body.photoURL}','${body.size||'A2'}',${body.categoryId||1},'${body.description}','${body.userId}' );`,
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct
};
