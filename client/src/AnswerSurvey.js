import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button, Form,FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShowQuestions from './QuestionDisplayComponent.js';
import API from './API.js';

//...

function AnswerToSurvey(props) {
    const { id } = useParams();

    const [modalShow, setModalShow] = useState(true);
    const closeModal = () => setModalShow(false);
    const [username, setUsername] = useState('');

    const [survey, setSurvey] = useState(null);

    async function addQuestion(survey) {
        await fetch('/api/answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username : username , id : id , survey: JSON.stringify(survey) })
        });
        // setSuccessModalShow(true);    
      }

    function manageSubmit(){
        //TODO validation
        if(false){
        }
        else{
            console.log("true");

            addQuestion(survey)
            alert("question submitted");
        }

    }
        

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
        <ShowQuestions isAnswering={true} manageSubmit={manageSubmit} questions={survey} setQuestions={setSurvey} /> 
        <AskNameModal username={username} setUsername = {setUsername} show={modalShow} closeModal={closeModal} />
         {/* TODO fix style */}
        <Button style={{margin : "1rem 0px 0px"}} onClick={manageSubmit} className="float-right" variant="success">Submit survey</Button>

        </>
        );
    else return ""; 

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

