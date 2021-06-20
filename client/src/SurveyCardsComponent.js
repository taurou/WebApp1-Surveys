import { Modal, Button, Card, CardColumns } from 'react-bootstrap';
import {Link } from 'react-router-dom';

function SurveyCards(props) {
  return (
    <CardColumns style={{ margin: '5rem 0px 0px' }} >

    {props.surveysArray.map((item) => {
      return (
        <Card style={{ marginwidth: '18rem' }}>

          <Card.Body>
                        <Card.Title>{item.Questions.nameSurvey}</Card.Title>
{/* TODO sistemare aspetto delnumero di risposte e vedere se si può usare filter anziché map */}
                        { props.isAdmin ? props.countAnswers.map(obj => ( obj.SurveyId === item.SurveyId ? <p>{obj.NumRisposte} answers</p>  : "")) : "" }
            {!props.isAdmin ? <Link to={`answersurvey/${item.SurveyId}`} >
            <Button variant="success">Answer this survey</Button></Link> : 
            <Link to={`tobedefinedyet/${item.SurveyId}`} >
            <Button disabled variant="success">Check answers</Button></Link> }
            
          </Card.Body>

        </Card>
      )
    })}

</CardColumns>

  );

  
}
export default SurveyCards