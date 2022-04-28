const pool = require("../../pool").pool;
const getCart = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "CART" ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getCartById = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM \"CART\" WHERE \"id\"=${id}`,
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

const getProductsFromCartByUserId = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * from "ProductCart" INNER JOIN "PRODUCT" ON "ProductCart"."productId"="PRODUCT".id WHERE "ProductCart"."cartId"=(SELECT "id" from "CART" WHERE "userId"=${id});`,
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
const postProductByUserId = (userId, productId,quantity) => {
  return new Promise(async function (resolve, reject) {
    console.log({userId,productId})
    const result=await pool.query(`SELECT * FROM \"ProductCart\" WHERE \"productId\"=${productId} AND "cartId"=(SELECT "id" FROM "CART" WHERE "userId"=${userId})`)
    console.log(result.rows)
    if(result.rows.length==0)
    {
      pool.query(
        ` INSERT INTO "ProductCart" VALUES(${productId},(SELECT "id" FROM "CART" WHERE "userId"=${userId}),${quantity});`,
        (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          if(!results)resolve([]);
          else resolve(results.rows);
        }
      );
    }
    else{
      reject({status:400,msg:"Duplicate Entry founded"})
    }
  });
};

module.exports = {
  getCart,
  getCartById,
  getProductsFromCartByUserId,
  postProductByUserId
};
