import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavbarComponents.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Container } from 'react-bootstrap';
import CreateSurvey  from './CreateSurveyComponent.js';
function App() {


  
  return (
    <>
      <NavigationBar/>
      <CreateSurvey />
    </>
    );
}

export default App;
