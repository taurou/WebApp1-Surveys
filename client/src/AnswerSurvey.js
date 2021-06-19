import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button, Form,FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from './API.js';

//...

function AnswerToSurvey(props) {
    const { id } = useParams();

    const [modalShow, setModalShow] = useState(true);
    const closeModal = () => setModalShow(false);
    const [username, setUsername] = useState('');

    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const getSurveyById = async () => {
            const survey = await API.getSurveyById(id);
            setSurvey(survey)
        };

        getSurveyById(id).catch(err => {
            alert('error while getting survey!')
        });
        
    }, []);
    if(survey)
    return  (
        <>
        <ShowQuestions questions={survey}  /> 
        <AskNameModal username={username} setUsername = {setUsername} show={modalShow} closeModal={closeModal} />
        </>
        );
    else return ""; 

}

function ShowQuestions(props) {
    return (

        <div style={{ margin: '5rem 0px 0px' }}>
            <h2>Survey: {props.questions.nameSurvey}</h2>
            {props.questions.questionArray.map((val, i) => {

                return (
                    <Card style={{ margin: '7px' }}>
                        <Card.Header>
                            Question {i + 1}: {val.title}
                        </Card.Header>
                        <ListGroup variant="flush">
                            <Form>
                            {val.isMultiple ? //se non funziona più, togliere questo!
                                
                                val.multipleAnswers.map((answer, j) => {

                                    return ( //TODO controllare se funziona anche senza return
                                            
                                            <Form.Check style={{ margin:"1rem"} }id={j} name={i} type={val.max === 0 ? "checkbox" : "radio"}  label = {answer}>

                                            </Form.Check>
                                        
                                        // <ListGroup.Item>{j + 1}. {answer}</ListGroup.Item>
                                    )
                                })
                                : 
                                <Form.Control maxLength="200" rows={3}  as="textarea" /*value={pippo} onChange={(event)=>setPippo(event.target.value)}*/ />
                                
                            }
                            
                            </Form>
                        </ListGroup >
                    </Card>
            )})}

        </div>

    );
}

function AskNameModal(props) {

    const [ errorMessage, SetErrorMessage ] = useState("");
    
    function validateAndSubmit(){


        if(props.username === "")
            SetErrorMessage("Empty name, please enter a valid name"); 
        else
           props.closeModal();

    }

      return (
        <Modal
          show={props.show}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
        <Form  onSubmit={(event) => event.preventDefault()}  >
        Insert your name: <Form.Control type='text' value={props.username} onChange={(event) => { props.setUsername(event.target.value) }} />
        
         </Form> 

          </Modal.Body>
          <Modal.Footer>
              <p> {errorMessage} </p>
          <Link to ="/"><Button  variant="secondary">Go back</Button> </Link> <br />
          <Button onClick = {() => validateAndSubmit()} variant="success"> Submit </Button><br />
        </Modal.Footer>

        </Modal>
      );
    }
    

export default AnswerToSurvey

