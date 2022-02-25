const pool = require("../../pool")
const getWishlist = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"WISHLIST\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getWishlistById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"WISHLIST\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

module.exports = {
    getWishlist,
    getWishlistById
};
