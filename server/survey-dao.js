'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('survey.sqlite', (err) => {
  if(err) throw err;
});


exports.createSurvey = (adminID, survey) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO survey(AdminId, Questions) VALUES(?, ?)';
      db.run(sql, [adminID, JSON.stringify(survey)], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(adminID);
      });
    });
  };

//creare la answer
  exports.createAnswer = (user, id, survey) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO answer(Username, SurveyId, Questions) VALUES(?, ?, ?)';
      db.run(sql, [user, id, JSON.stringify(survey)], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(id);
      });
    });
  };
  

exports.getSurveyById = (surveyID) => {

    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM survey WHERE SurveyId=?';
      db.get(sql, [surveyID] , (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          reject({error: 'Id not found.'});
        } else {
          
          resolve(row.Questions);
        }
      });
    });
  };
  

  exports.listSurveys = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM survey ';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const surveys = rows.map((e) => ({SurveyId : e.SurveyId , Questions : JSON.parse(e.Questions)}))
        resolve(surveys);
      });
    });
  };


  exports.listSurveysByAdminID = (adminID) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM survey WHERE AdminId=? ';
      db.all(sql, [adminID], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const surveys = rows.map((e) => ({SurveyId : e.SurveyId , Questions : JSON.parse(e.Questions)}))
        resolve(surveys);
      });
    });
  };
