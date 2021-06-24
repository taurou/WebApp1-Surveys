'use strict';

const express = require('express');
const morgan = require('morgan')
const session = require('express-session'); // session middleware
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const passportLocal = require('passport-local');

const userDao = require('./user-dao');
const surveyDao = require('./survey-dao');

const app = express();


// init express
const port = 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

// initialize and configure passport
passport.use(new passportLocal.Strategy(
  {
    usernameField: 'email'
  },
  (username, password, done) => {
    // verification callback for authentication
    userDao.getUser(username, password).then(user => {
      if (user) {
        done(null, user);
      }
      else
        done(null, false, { message: 'Email or password wrong' });
    }).catch(err => {
      done(err);
    });
  }));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {

  if (req.isAuthenticated())
    return next();
  return res.status(401).json({ error: 'not authenticated' });
}


// initialize and configure HTTP sessions
app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', [ check('email').isEmail(), check('password').isLength({min :6})  ] , function (req, res, next) {

  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(422).json({message: "Email or password in the wrong format"});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});


// create a new survey
app.post('/api/survey', isLoggedIn, async (req, res) => {

  try {
    await surveyDao.createSurvey(req.user.id, req.body);
    res.end();
  } catch (error) {
    res.status(500).json(error);

  }
});

// save answer NO NEED TO CHECK LOGIN!
app.post('/api/answer', async (req, res) => {
  try {
    await surveyDao.createAnswer(req.body.username, req.body.id, req.body.survey);
    res.end();
  } catch (error) {
    res.status(500).json(error);

  }
});



// retrieve survey by id
app.get('/api/survey/id/:id', async (req, res) => {

  const id = req.params.id;
  try {
    let survey = await surveyDao.getSurveyById(id);

    res.json(survey);
  } catch (error) {
    res.status(500).json(error);
  }
});


// retrieve all surveys
app.get('/api/survey/all', async (req, res) => {

  try {
    let survey = await surveyDao.listSurveys();
    res.json(survey);
  } catch (error) {
    res.status(500).json(error);
  }
});

// retrieve all surveys by adminId
app.get('/api/survey/all/byadmin', isLoggedIn,  async (req, res) => {
  
  try {
    let survey = await surveyDao.listSurveysByAdminID(req.user.id);
    res.json(survey);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/api/survey/countanswers', isLoggedIn,  async (req, res) => {
  
  try {
    let survey = await surveyDao.countAnswers(req.user.id);
    res.json(survey);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get answerID array
app.get('/api/survey/answerids/:id', isLoggedIn, async (req, res) => {
  const id = req.params.id;

  try {
    let aIDs = await surveyDao.getAnswerIDs(id, req.user.id);
    res.json(aIDs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// retrieve answer by id
app.get('/api/answer/id/:id', isLoggedIn, async (req, res) => {

  const id = req.params.id;
  try {
    let answer = await surveyDao.getAnswerById(id, req.user.id);

    res.json(answer);
  } catch (error) {
    res.status(500).json(error);
  }
});
