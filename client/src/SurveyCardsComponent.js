import { Button, Card, CardColumns } from 'react-bootstrap';
import {Link } from 'react-router-dom';

function SurveyCards(props) {
  return (
    <CardColumns style={{ margin: '5rem 0px 0px' }} >

    {props.surveysArray.map((item, z) => {
      return (
        <Card key={item.Questions.nameSurvey+"_"+z} style={{ marginwidth: '18rem' }}>

          <Card.Body>
                        <Card.Title>{item.Questions.nameSurvey}</Card.Title>
                        { props.isAdmin ? props.countAnswers.map((obj,k ) => ( obj.SurveyId === item.SurveyId ? <><Button key={item.Questions.nameSurvey+"_1"+k} style={{margin: '3px'}}disabled>{obj.NumRisposte}</Button><Link key={item.Questions.nameSurvey+"_4"+k}  to={`viewanswers/${item.SurveyId}/0`} >
            <Button key={item.Questions.nameSurvey+"_2"} variant="success">Check answers</Button></Link></>  :  ""  )) : <Link key={item.Questions.nameSurvey+"_7"}  to={`answersurvey/${item.SurveyId}`} >
            <Button key={item.Questions.nameSurvey+"_3"} variant="success">Answer this survey</Button></Link> }
            
            {props.isAdmin && !props.countAnswers.some(el => el.SurveyId === item.SurveyId) ? <><Button variant="info"  style={{margin: '3px'}} disabled>0</Button>
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



