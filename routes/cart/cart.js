const pool = require("../../pool")
const getCart = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"CART\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getCartById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"CART\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

module.exports = {
    getCart,
    getCartById
};
