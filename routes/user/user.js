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
            resolve(results.rows[0]);
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

const createUser=({email, password,address, mobile})=>{
    return new Promise(function (resolve, reject) {
        pool.query(`INSERT INTO "USER" ("emailId","password","address","mobile") VALUES ('${email}','${password}','${address}','${mobile}');`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const updateUser=(id,{email, password,address, mobile})=>{
    return new Promise(function (resolve, reject) {
        pool.query(`UPDATE "USER" SET "emailId"='${email}', "password"='${password}', "address"='${address}', "mobile"='${mobile}' where id=${id};`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);  
        });
    });
}

const viewUserProducts=(id)=>{
    return new Promise(function(resolve,reject){
        pool.query(`SELECT * from "PRODUCT" INNER JOIN "USER" ON "PRODUCT"."userId"="USER"."id" where "USER".id=${id}`, (error, results) => {
            if (error) {
                console.log(error)
                reject(error);
            }
            resolve(results.rows);  
        });
    })
}

module.exports = {
    createUser,
    updateUser,
    getUser,
    viewUserProducts,
    getUserById,
    getOrdersByUserId
};
