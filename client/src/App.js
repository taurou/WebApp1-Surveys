import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavbarComponents.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Button } from 'react-bootstrap';
import CreateSurvey from './CreateSurveyComponent.js';

import MessageModal from './MessageModal.js'
import LoginForm from './LoginComponents.js';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Surveys from './SurveyManagement.js';
import API from './API.js';
import UserView from './UserComponent.js';
import AnswerToSurvey from './AnswerSurvey.js';
import ViewAnswers from './AnswerView.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log("auth chegk!")
    const checkAuth = async () => {
      try {
        const userinfo = await API.getUserInfo();
        setUsername(userinfo.email);
        setLoggedIn(true);
      } catch (err) {

        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
  }


  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUsername(user);
      setMessage({ msg: `Welcome, ${user}!`, type: 'success' });
      handleShow();
    } catch (err) {
      setMessage({ msg: err + "!", type: 'danger' });
      handleShow();
    }
  }

  return (
    <Router>
      <Container fluid>
        <NavigationBar logout={doLogOut} login={loggedIn} username={username} />

        {message && <MessageModal setMessage={setMessage} handleClose={handleClose} message={message} show={show} />}
        <Switch>
          <Route exact path="/">
            <UserView login={loggedIn}/>
          </Route>

          <Route exact path="/answersurvey/:id">
            <AnswerToSurvey login={loggedIn} />
          </Route>
          <Route exact path="/viewanswers/:id">
            { loggedIn ? <ViewAnswers login={loggedIn}  /> :  <LoginForm login={doLogIn} setMessage={setMessage} handleClose={handleClose} handleShow={handleShow} show={show} /> }
          </Route>

          <Route exact path="/login" render={() =>
            <>{loggedIn ? <Redirect to="/adminpanel" /> : <LoginForm login={doLogIn} setMessage={setMessage} handleClose={handleClose} handleShow={handleShow} show={show} />
            }</>
          } />

          <Route exact path="/adminpanel"
            render={() =>
              <>{
                loggedIn ? <Surveys login={loggedIn} /> : <Redirect to="/login" />

              }</>} />

          <Route exact path="/adminpanel/newsurvey" render={() =>
            <>{loggedIn ? <CreateSurvey login={loggedIn} /> :  <LoginForm login={doLogIn} setMessage={setMessage} handleClose={handleClose} handleShow={handleShow} show={show} /> }</>

          }

          />

        </Switch>

      </Container>
    </Router>
  );
}

export default App;
