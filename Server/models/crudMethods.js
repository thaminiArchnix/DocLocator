//General CRUD Operations

/*
Variables 

tableName : Name of database table to be changed.
tableData : An array of field names of the table to be changed
*/

const crudMethods = (tableName) => {
  const connection = require("../db/connection.js");

  //General CRUD operation for all roles
  //sql : sql query
  //data : data passed to the query
  function crudOps(sql, data) {
    return new Promise((resolve, reject) => {
      connection.query(sql, data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  return {
    getAll: async function () {
      return crudOps(`SELECT * FROM ${tableName}`);
    },

    //data : id
    getById: async function (data, tableData) {
      return crudOps(`SELECT * FROM ${tableName} WHERE ${tableData} = ?`, data);
    },

    getByDate: async function (data, tableData) {
      return crudOps(
        `SELECT * FROM ${tableName} WHERE date = ? AND docId = ?`,
        data
      );
    },

    //data : list of data to be added to table
    create: async function (data, tableData) {
      const values = [];
      for (let i = 0; i < tableData.length; i++) {
        values.push("?");
      }
      return crudOps(
        `INSERT INTO ${tableName} (${tableData}) VALUES (${values})`,
        data
      );
    },

    //data : array of values to be updated with id appended to the end
    update: async function (data, tableData, idData) {
      const setClause = tableData.map((column) => ` ${column} = ?`).join(", ");
      return crudOps(
        `UPDATE ${tableName} SET ${setClause} WHERE ${idData} = ?`,
        data
      );
    },

    //data : id
    delete: async function (data, tableData) {
      return crudOps(`DELETE FROM ${tableName} WHERE ${tableData} = ?`, data);
    },

    getDoctorByEmail: async function (userEmail) {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM doctors WHERE email = ?";
        connection.query(sql, [userEmail], function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  };
};

module.exports = crudMethods;
