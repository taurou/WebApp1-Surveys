import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Container, Button, Form, FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShowQuestions from './QuestionDisplayComponent.js';
import API from './API.js';
import { MessageModalLite } from './MessageModal.js'
//...

function AnswerToSurvey(props) {
  const { id } = useParams();

  const [modalShow, setModalShow] = useState(true);
  const closeModal = () => setModalShow(false);
  const [username, setUsername] = useState('');
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [messageModal, setMessageModal] = useState(false)
  const [survey, setSurvey] = useState(null);

  async function addQuestion(survey) {
    await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, id: id, survey: JSON.stringify(survey) })
    });
    setSuccessModalShow(true);
  }


  function manageSubmit() {
    let obj = validateAnswers();
    console.log(obj);
    if (obj) {
      addQuestion(survey);
    }
    else {
      setMessageModal(true);
    }

  }
  function validateAnswers() {

    let count = 0;
    for (let i = 0; i < survey.questionArray.length; i++) {
      if (survey.questionArray[i].isMultiple) {
        count = 0;

        for (let j = 0; j < survey.questionArray[i].answerToQuestion.length; j++) {

          if (survey.questionArray[i].answerToQuestion[j] === true) {
            count++;
          }

        }
        if (count > survey.questionArray[i].max || count < survey.questionArray[i].min) {
          return false
        }

      }
      else {
        if (!survey.questionArray[i].isOptional && !survey.questionArray[i].answerToQuestion.trim())
          return false

      }
    }
    return true;
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

  if (survey)
    return (
      <>
        <MessageModalLite handleClose={() => setMessageModal(false)} message="Please, fill the form correctly" show={messageModal} />
        <RedirectModal show={successModalShow} ></RedirectModal>
        <ShowQuestions isAnswering={true} manageSubmit={manageSubmit} questions={survey} setQuestions={setSurvey} />
        <AskNameModal username={username} setUsername={setUsername} show={modalShow} closeModal={closeModal} />
        {/* TODO fix style */}
        <Container><Button style={{ margin: "1rem 0px 0px" }} onClick={manageSubmit} className="float-right" variant="success">Submit survey</Button></Container>

      </>
    );
  else return "";

}



function AskNameModal(props) {

  const [errorMessage, SetErrorMessage] = useState("");

  function validateAndSubmit() {


    if (!props.username.trim())
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
        <Form onSubmit={(event) => event.preventDefault()}  >
          Insert your name: <Form.Control type='text' value={props.username} onChange={(event) => { props.setUsername(event.target.value) }} />

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <p> {errorMessage} </p>
        <Link to="/"><Button variant="secondary">Go back</Button> </Link> <br />
        <Button onClick={() => validateAndSubmit()} variant="success"> Submit </Button><br />
      </Modal.Footer>

    </Modal>
  );
}

function RedirectModal(props) {

  return (
    <Modal
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        Answer successfully submitted!
      </Modal.Body>
      <Modal.Footer>
        <Link to="/"><Button variant="secondary">Go back to Home Page</Button> </Link>
      </Modal.Footer>

    </Modal>
  );
}


export default AnswerToSurvey

