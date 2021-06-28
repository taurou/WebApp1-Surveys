# Exam #1: "Surveys"

## Student: s281605 TAURINO ANDREA 

## React Client Application Routes

- Route _exact_ `/` : home page for users, here all published surveys are shown and the user can choose which survey to fill

- Route _exact_ `/answersurvey/:id ` : this page allows the user to fill and submit the survey selected in the home page.

  The `:id` parameter identifies the survey and it is used to retrieve the questions from the database (SurveyId field in answer table) 

- Route _exact_ `/adminpanel` : page for the administrators, here all the surveys published by a certain admin are shown with the number of received responses, there's also a button that allows to create a new survey. If #responses >0, the admin can choose a survey and check the answers given by each user.

- Route _exact_ `adminpanel/newsurvey` : page where the admin can create a new survey with an indefinite number of questions whom can be deleted or moved up/down.

- Route exact `/viewanswers/:id/:ansid` : page where the user can read all the answers given to survey by a user.

  `:id` identifies the survey (SurveyId on the DB) and `:ansid` is a sequential number that allows to move between the answers given by different users to the chosen survey. `:ansid` goes from 0 to `#answers-given-to-[:id]-survey - 1`

- Route `/` : this route is at the bottom of the list, and just redirects any address different from the ones described above (e.g. `/ran-dom-rou-te`) to `/`

## API Server

- POST `/api/survey` - saves a new survey in the DB
  - request body content: `{"nameSurvey": survName, "questionArray": [{"title" : survTitle, "isMultiple": isMultipleBoolean , "isOptional" : isOptionalBoolean, "multipleAnswers": [...] , "max": maxAnswers, "min" : minAnswers , "answerToQuestion" : []}, ...]}`
  
- POST `/api/answer` - stores the survey filled by the user in the DB

  - request body content: `{"username": nameOfUser,"id": surveyId , "survey" : {"questionArray":[{"answerToQuestion": answer}, ... , {"answerToQuestion": answer(s)}, ...] } }`

- GET `/api/survey/id/:id` - retrieves a survey by its SurveyId 

  - request parameters: SurveyId `:id`
  - response body content:  `{"nameSurvey": survName, "questionArray": [{"title" : survTitle, "isMultiple": boolean , "isOptional" : boolean, "multipleAnswers": [...] , "max": maxAnswers, "min" : minAnswers , "answerToQuestion" : [...]}, ...]}`

- GET `/api/survey/all` - retrieves all the surveys stored in the DB

  - response body content:  `[{"SurveyId": surveyId,"Questions":[{"nameSurvey": survName, "questionArray": [{"title" : survTitle, "isMultiple": boolean , "isOptional" : boolean, "multipleAnswers": [...] , "max": maxAnswers, "min" : minAnswers , "answerToQuestion" : [...]},  ...] } ]`

- GET `/api/survey/all/byadmin` - retrieves all the surveys published by a particular admin

  - response body content:  `[{"SurveyId": surveyId,"Questions":[{"nameSurvey": survName, "questionArray": [{"title" : survTitle, "isMultiple": boolean , "isOptional" : boolean, "multipleAnswers": [...] , "max": maxAnswers, "min" : minAnswers , "answerToQuestion" : [...]},  ...] } ]`

- GET `api/survey/countanswers` - returns, for each survey, the number of submissions by users 

  - response body content: `[{"SurveyId": surveyId,"NumRisposte": numAnswersToSurvey},{"SurveyId": surveyId,"NumRisposte": numAnswersToSurvey}, ...]`

- GET `/api/survey/answerids/:id` - retrieves all the AnswerIds for a specific survey 

  - request parameters: surveyId `:id`
  - response body content:  `[{"AnswerId":answerId},{"AnswerId":answerId}, ...]`

- GET `/api/answer/id/:id`  - retrieves the answers of the survey submitted by a user

  - request parameters: AnswerId `:id`
  - response body content:  `{"Username":nameOfUser,"Questions":{"questionArray":[{"answerToQuestion":answer(s)},{"answerToQuestion":answer(s)}, ...]}}`

  

## Database Tables

- Table `user` - contains **`id`**, `username`, `name`, `hash`
  - `id` uniquely identifies the admin, is the same as `AdminId` in the tables below
- Table `survey` - contains **`SurveyId`**, `AdminId`, `Questions`
  - `Questions` contains the JSON of the survey (title, array of questions and [empty] answers and other information such as: optional answer, multiple answer, max and min of selectable multiple answers)
- Table `answer` - contains **`AnswerId`**, `SurveyId`, `Username`
  - `Username` is the name of the user who filled the survey

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

### Admin 1
- username: `pippo-adm-sud`
- password: `plutoishere`
- name: Pippo Papero 

#### Surveys
- Survey `1`: "Will you get the Covid-19 vaccine?"
- Survey `3`: "Title of study"
- Survey `4`: "Pizza flavours"

### Admin 2
- username: `gio-adm-centrale`
- password: `ravioli`
- name: Giovanni Rana 

#### Surveys
- Survey `2`: "Pets"

- Survey `5`: "Today's lunch"

### 
