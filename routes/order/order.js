const pool = require("../../pool").pool
const getOrders = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"ORDER\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });``
};

const getOrdersById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"ORDER\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

module.exports = {
    getOrders,
    getOrdersById
};
