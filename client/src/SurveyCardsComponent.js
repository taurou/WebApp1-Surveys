import { Modal, Button, Card, CardColumns } from 'react-bootstrap';
import {Link } from 'react-router-dom';

function SurveyCards(props) {
  return (
    <CardColumns style={{ margin: '5rem 0px 0px' }} >
      {/* <Card>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  </Card> */}

    {props.surveysArray.map((item) => {
      return (
        <Card style={{ marginwidth: '18rem' }}>

          <Card.Body>
                        <Card.Title>{item.Questions.nameSurvey}</Card.Title>
            <Link to={`answersurvey/${item.SurveyId}`} >
            <Button variant="success">Answer this survey</Button></Link>
          </Card.Body>

        </Card>
      )
    })}

</CardColumns>

  );

  
}
export default SurveyCards