import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import { useState, useEffect } from 'react';
import API from './API.js';
import SurveyCards from './SurveyCardsComponent.js';


function Surveys(props) {
  
  
    const [surveysArray, setSurveysArray] = useState([]);
    const [countAnswers, setCountAnswers] = useState([]);

  
    useEffect(() => {
      const getCountAnswers = async () => {
        const count = await API.getCountAnswers();
        setCountAnswers(count);
      };
  
      getCountAnswers().catch(err => {
        alert('error while counting surveys!')
      });
  
    }, []);


  //TODO validate! checks! (in tutte le useEffect del programma)

    useEffect(() => {
      const getAllSurveys = async () => {
        const surveys = await API.getAllSurveysByAdmin();
        setSurveysArray(surveys)
        console.log(surveys);
      };
  
      getAllSurveys().catch(err => {
        alert('error while getting all surveys!')
      });
  
    }, []);
  
     
  

    return (
      <>
       <SurveyCards countAnswers={countAnswers} surveysArray={surveysArray}  setSurveysArray={setSurveysArray} />
      <Link to="/adminpanel/newsurvey"><Button className="fixed-right-bottom" >
       Create new survey </Button>
        </Link>
      </>
    );
}

export default Surveys;
