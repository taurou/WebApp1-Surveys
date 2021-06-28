'use strict';
const db = require('./db');
const bcrypt = require('bcrypt');

// DAO operations for validating users
exports.getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE username = ?';
    db.get(sql, [username], (err, row) => {
      if (err)
        reject(err); // DB error
      else if (row === undefined)
        resolve(false); // user not found
      else {
        bcrypt.compare(password, row.hash).then(result => {
          if (result) // password matches
            resolve({ id: row.id, username: row.username, name: row.name });
          else
            resolve(false); // password not matching
        })
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        const user = { id: row.id, username: row.username }
        resolve(user);
      }
    });
  });
};
