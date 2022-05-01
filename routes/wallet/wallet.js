const pool = require("../../pool").pool
const getWallet = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM \"WALLET\" ORDER BY id ASC", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getWalletById = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"WALLET\" WHERE \"id\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const getWalletByUserId=(id)=>{
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM \"WALLET\" WHERE \"userId\"=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

module.exports = {
    getWallet,
    getWalletById,
    getWalletByUserId
};
