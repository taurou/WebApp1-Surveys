import { Modal, Button, Card, CardColumns } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import API from './API.js';

function UserView() {

  const [surveysArray, setSurveysArray] = useState([]);



  useEffect(() => {
    const getAllSurveys = async () => {
      const surveys = await API.getAllSurveys();
      setSurveysArray(surveys)
      console.log(surveys);
    };

    getAllSurveys().catch(err => {
      alert('error while getting all surveys!')
    });

  }, []);



  return (

    <SurveyCards surveysArray={surveysArray}  setSurveysArray={setSurveysArray} />
    
  );
}



export default UserView;


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

  {/*   
<Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card>

<Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card>
<Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card><Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card><Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card>
<Card style={{ marginwidth: '18rem' }}>

  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
</Card> */}
}