import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavbarComponents.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container } from 'react-bootstrap';
import CreateSurvey  from './CreateSurveyComponent.js';

import MessageModal from './MessageModal.js'
import LoginForm from './LoginComponents.js';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from './API.js';


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState(''); 

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        await API.getUserInfo();
        setLoggedIn(true);
      } catch(err) {
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
      setMessage({msg: `Welcome, ${user}!`, type: 'success'});
      handleShow();
    } catch(err) {
      setMessage({msg: err+"!", type: 'danger'});
      handleShow();
    }
  }


  return (
    <Router>
      <Container fluid>
        <NavigationBar logout={doLogOut} login={loggedIn} username={username}/>

        {message && <MessageModal setMessage={setMessage} handleClose={handleClose} message={message} show={show}/> }
        <Switch>
        <Route path="/login" render={() => 
          <>{loggedIn ? <Redirect to="/adminpanel" /> : <LoginForm login={doLogIn} setMessage={setMessage} handleClose={handleClose} handleShow={handleShow} show={show}/>}</>
        }/>

        <Route path="/" render={() =>
        <>
          {loggedIn ?
              ""
              : <Redirect to="/login" /> }
        </>
        } />
      </Switch>
      
      </Container>
    </Router>
    );
}

export default App;
