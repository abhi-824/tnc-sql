const pool = require("../../pool")
const getTransaction = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"TRANSACTION\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getTransactionById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"TRANSACTION\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

module.exports = {
    getTransaction,
    getTransactionById
};
