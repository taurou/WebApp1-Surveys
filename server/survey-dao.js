'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('survey.sqlite', (err) => {
  if(err) throw err;
});


exports.createSurvey = (adminID, survey) => {
    console.log(survey);
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO survey(AdminId, Questions) VALUES(?, ?)';
      db.run(sql, [adminID, survey], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(adminID);
      });
    });
  };
  