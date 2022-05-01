const pool = require("../../pool").pool;
const product_model = require("../product/product_model");
const getOrders = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "ORDER" ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  ``;
};

const getOrdersById = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM \"ORDER\" WHERE \"id\"=${id}`,
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
const createOrderByUserIdandProductId = (uid, pid, qty) => {
  console.log(uid, pid, qty);
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT \"amount\" from "WALLET" where "userId"=${uid}`,
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        const amt = results.rows[0].amount;
        product_model
          .getProductsById(pid)
          .then(async (response) => {
            const productAmt = response[0].price * qty;
            console.log(productAmt, amt);
            if (amt >= productAmt) {
              await pool.query(
                `UPDATE "WALLET" SET "amount"=$1 WHERE "userId"=$2;`,
                [amt - productAmt,uid]
              );
              // console.log(pid,amt-productAmt)
              await pool.query(
                `INSERT INTO "ORDER" ("userId","productId","quantity","date","isDelivered","priceBreakdown","userDetail") VALUES($1,$2,$3,$4,$5,$6,$7)`,
                [uid, pid, qty, new Date().toISOString(), false, {}, {}]
              );
              const recieversAmount = await pool.query(
                `SELECT \"amount\" from "WALLET" where "userId"=${response[0].userId}`
              );
              console.log(recieversAmount.rows, response[0].userId);
              await pool.query(
                'UPDATE "WALLET" SET "amount"=$1 WHERE "userId"=$2',
                [
                  recieversAmount.rows[0].amount + productAmt,
                  response[0].userId,
                ]
              );
              resolve("Everything went smoothly!")
            } else {
              reject({ data: "Low wallet balance!" });
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    );
  });
};
module.exports = {
  getOrders,
  getOrdersById,
  createOrderByUserIdandProductId,
};
