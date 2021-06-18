import { Col, Card, ListGroup, Row, Container, Select, Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import _default from 'react-bootstrap/esm/CardColumns';

function CreateSurvey(props) {

  const [modalShow, setModalShow] = useState(false);
  const [nameSurvey, setNameSurvey] = useState("");
  const [questionArray, setQuestionArray] = useState([]);

  const closeModal = () => setModalShow(false);

  function SubmitSurvey(){
    if(nameSurvey!==""){
        let survey = { nameSurvey : nameSurvey, questionArray : questionArray }
        addSurvey(survey);
        return <Redirect to = "/adminpanel"/>

    }else
    alert("Please, set a survey name!");
  }

  async function addSurvey(newSurvey) {
    await fetch('/api/survey', {method : 'POST', 
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(newSurvey)
    });
   // props.setTask(oldTasks => [...oldTasks, newTask]);
   //props.setUpdate(true);

  }



  async function getSurveyById(id) {
    const response = await fetch('/api/survey/id/'+id, {method : 'GET', 
    headers: {
        'Content-Type': 'application/json',
        }});
   const responseJSON = await response.json();
   console.log(JSON.parse(responseJSON));
}

  function SwapQuestionTop(i) {
    if (i != 0) {
      let copia = [...questionArray];
      let copia_i = copia[i];
      copia[i] = copia[i - 1];
      copia[i - 1] = copia_i;
      setQuestionArray([...copia]);

    }
  }

  function SwapQuestionBottom(i) {
    if (questionArray.length > 1 && i != (questionArray.length - 1)) {
      let copia = [...questionArray];
      let copia_i = copia[i];
      copia[i] = copia[i + 1];
      copia[i + 1] = copia_i;
      setQuestionArray([...copia]);

    }
  }

  function DeleteQuestion(i) {
    let copia = questionArray.filter((_, index) => index !== i);
    setQuestionArray([...copia]);

  }

  function ShowQuestions(props) {
    if (questionArray.length === 0)
      return "";
    else
      return (
        <div style={{ margin: '20px 0px 0px' }}>
          {
            questionArray.map((val, i) => {
              return (<Card style={{ margin: '7px' }}>
                <Card.Header>
                  <svg style={{ margin: '0px 2px 2px' }} onClick={() => DeleteQuestion(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                  <svg style={{ margin: '0px 2px 2px' }} onClick={() => SwapQuestionBottom(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                  </svg>
                  <svg style={{ margin: '0px 2px 2px' }} onClick={() => SwapQuestionTop(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                  </svg> Question {i + 1}: {val.title}</Card.Header>

                <ListGroup variant="flush">
                  {val.isMultiple ? //se non funziona più, togliere questo!

                    val.multipleAnswers.map((answer, j) => {

                      return (
                        <ListGroup.Item>{j + 1}. {answer}</ListGroup.Item>
                      )
                    })
                    : ""

                  }
                </ListGroup >
              </Card>

              );
            })
          }
        </div>
      );
  }

  return (

    <Row className="login">
      <Col >
        <Form>
          <Form.Label>Name of the survey</Form.Label>
          <Form.Control type='text' value={nameSurvey} onChange={(event) => { setNameSurvey(event.target.value) }} /><br />
        </Form>
        <Button style = {{margin : "0px 4px 4px"}} onClick={() => setModalShow(true)}>Add question</Button>
        <Button variant="success" style = {{margin : "0px 4px 4px"}} onClick={SubmitSurvey}>Submit survey</Button>
        <Button onClick={() => getSurveyById(13)}> Prova </Button>

        <NewQuestionModal show={modalShow} closeModal={closeModal} questionArray={questionArray} setQuestionArray={setQuestionArray} onHide={() => setModalShow(false)} />
        <ShowQuestions />

      </Col>
    </Row>


  );


}


function NewQuestionModal(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuestionForm closeModal={props.closeModal} questionArray={props.questionArray} setQuestionArray={props.setQuestionArray} />
      </Modal.Body>
    </Modal>
  );
}


function QuestionForm(props) {



  const [questionTitle, setQuestionTitle] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const [multipleAnswers, setMultipleAnswers] = useState(["", "", "", "", "", "", "", "", "", ""]);

  const [isOptional, setIsOptional] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleSetMin = (e) => { setMin(e.target.value); };
  const handleSetMax = (e) => { setMax(e.target.value); };



  function handleChange(index, event) {
    const multAnsw = [...multipleAnswers];
    multAnsw.splice(index, 1, event.target.value)
    setMultipleAnswers(multAnsw);
  }



  const handleForm = (event) => {
    event.preventDefault();

    let closedOptions = multipleAnswers.filter(string => string !== '');
    //TODO fare i check! 
    //consideriamo la risposta multipla
    let optional = min === 0 ? true : false;

    let answer = { title: questionTitle, isMultiple: isMultiple, isOptional: optional, multipleAnswers: closedOptions, max: max, min: min };

    props.setQuestionArray([...props.questionArray, answer]);



    let valid = true;
/*       if (description === '') {
        setErrorMessage('Please, write a description');
        valid = false;
      }
      else if (deadline === '' && hour === '') {
        valid = true;
      }
      else if (hour === '' && deadline !== '') {
        setErrorMessage('If you insert a deadline, please, set also an hour.');
        valid = false;
      }
      else if (hour !== '' && deadline === '') {
        setErrorMessage('If you insert an hour, please, set also a deadline.');
        valid = false;
      }
  
 */      if (valid) {
      setErrorMessage('');
      props.closeModal();
    }
  }

  return (
    <>
      <Form>
        <Form.Label>Title of the question</Form.Label>
        <Form.Control type='text' value={questionTitle} onChange={(event) => { setQuestionTitle(event.target.value) }} /><br />

        <Form.Check type="checkbox" checked={isMultiple} id="multiple" custom onChange={(event) => { setIsMultiple(event.target.checked) }} label="Multiple Answer" /><br />


        {isMultiple ? <p><Container><Row><Col><SelectElement title="Min" actuallySelected={min} handleSelect={handleSetMin} /></Col>
          <Col><SelectElement title="Max" handleSelect={handleSetMax} actuallySelected={max} /></Col></Row></Container></p> : ""}

        {isMultiple ?

          multipleAnswers.map((val, i) =>
            <p>
              <Form.Label> Option number {i + 1}</Form.Label>
              <Form.Control type='text' value={val} onChange={(event) => { handleChange(i, event) }} />
            </p>
          )
          :
          <div> <Form.Check type="checkbox" checked={isOptional} id="optional" custom onChange={(event) => { setIsOptional(event.target.checked) }} label="Optional" /><br /></div>

        }

        <Modal.Footer>
          <Button onClick={props.closeModal} variant="secondary">Cancel</Button><br />
          <Button onClick={handleForm}>Add question</Button><br />

        </Modal.Footer>

      </Form>
    </>
  );
}



function SelectElement(props) {

  return (
    <Form>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control as="select" custom onChange={props.handleSelect} value={props.actuallySelected}
      >
        <option value="0" >0</option>

        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
        <option value="6" >6</option>
        <option value="7" >7</option>
        <option value="8" >8</option>
        <option value="9" >9</option>
        <option value="10" >10</option>
      </Form.Control>
    </Form>);
}

export default CreateSurvey;

