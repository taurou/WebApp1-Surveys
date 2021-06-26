import { Button, Card, CardColumns } from 'react-bootstrap';
import {Link } from 'react-router-dom';

function SurveyCards(props) {
  return (
    <CardColumns className="surveyCardColumnMargin" >

    {props.surveysArray.map((item, z) => {
      return (
        <Card key={z} >

          <Card.Body>
                        <Card.Title>{item.Questions.nameSurvey}</Card.Title>
                        { props.isAdmin ? props.countAnswers.map((obj,k ) => ( obj.SurveyId === item.SurveyId ? <span key={z+"-"+k}><Button className="surveyCardButtonMargin" disabled>{obj.NumRisposte}</Button><Link to={`viewanswers/${item.SurveyId}/0`} >
            <Button variant="success">Check answers</Button></Link></span>  :  ""  )) : <Link to={`answersurvey/${item.SurveyId}`} >
            <Button  variant="success">Answer this survey</Button></Link> }
            
            {props.isAdmin && !props.countAnswers.some(el => el.SurveyId === item.SurveyId) ? <><Button variant="info" className="surveyCardButtonMargin" disabled>0</Button>
            <Button  disabled variant="secondary">No answers yet</Button></> : "" }
          
         
         
         
          </Card.Body>
            {/* interessante questo .some()
             che restituisce se all'interno di un vettore di oggetti 
             è contenuto un elemento con determinate caratteristiche (in questo caso con un determinato SurveyId) */}

        </Card>
      )
    })}

</CardColumns>

  );

  
}
export default SurveyCards



