const pool = require("../../pool").pool
const getUser = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"USER\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getUserById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"USER\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getOrdersByUserId= (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM "ORDER" INNER JOIN "PRODUCT" ON "ORDER"."productId"="PRODUCT".id WHERE "userId"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

module.exports = {
    getUser,
    getUserById,
    getOrdersByUserId
};
