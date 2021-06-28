import { Col, Card, ListGroup, Row, Container, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { MessageModalLite, RedirectModal } from './MessageModal.js'

function CreateSurvey(props) {

  const [messageModal, setMessageModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [nameSurvey, setNameSurvey] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  //TODO anche qui c'è un problema con le key! 

  function SubmitSurvey() {
    if (nameSurvey.trim()) {
      let survey = { nameSurvey: nameSurvey, questionArray: questionArray }
      if (questionArray.length !== 0)
        addSurvey(survey);
      else {
        setErrorMessage("Please, insert at least one question");
        setMessageModal(true);
      }


    } else {
      setErrorMessage("Please, insert a survey name");
      setMessageModal(true);
    }
  }

  async function addSurvey(newSurvey) {
    await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSurvey)
    });
    setSuccessModalShow(true);

  }

  function SwapQuestionTop(i) {
    if (i !== 0) {
      let copia = [...questionArray];
      let copia_i = copia[i];
      copia[i] = copia[i - 1];
      copia[i - 1] = copia_i;
      setQuestionArray([...copia]);

    }
  }

  function SwapQuestionBottom(i) {
    if (questionArray.length > 1 && i !== (questionArray.length - 1)) {
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
        <div className="createSurDivMargin">
          {
            questionArray.map((val, i) => {
              return (
                <Card key={i} className="createSurCardMargin">
                  <Card.Header >
                    <svg onClick={() => DeleteQuestion(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash createSurUpDownDeleteMargin" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    <svg onClick={() => SwapQuestionBottom(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-down-circle createSurUpDownDeleteMargin" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg>
                    <svg onClick={() => SwapQuestionTop(i)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-circle createSurUpDownDeleteMargin" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg> Question {i + 1}: {val.title}
                    <Card.Subtitle className="text-right font-italic font-weight-light" >
                      {val.isMultiple ? `min:${val.min} max:${val.max}` : val.isOptional ? "optional answer" : "mandatory answer"}
                    </Card.Subtitle>

                  </Card.Header>

                  <ListGroup variant="flush">
                    {val.isMultiple ?

                      val.multipleAnswers.map((answer, j) => {

                        return (
                          <ListGroup.Item key={i + "_" + j}>{j + 1}. {answer}</ListGroup.Item>
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
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>Name of the survey</Form.Label>
          <Form.Control type='text' value={nameSurvey} onChange={(event) => { setNameSurvey(event.target.value) }} /><br />
        </Form>
        <Button className="createSurUpDownDeleteMargin" onClick={() => setModalShow(true)}>Add question</Button>
        <Button variant="success" className="createSurButtonMargin" onClick={SubmitSurvey}>Submit survey</Button>
        <MessageModalLite show={messageModal} handleClose={() => setMessageModal(false)} message={errorMessage} />
        <NewQuestionModal setErrorMessage={setErrorMessage} showMessageModal={() => setMessageModal(true)} show={modalShow} closeModal={() => setModalShow(false)} questionArray={questionArray} setQuestionArray={setQuestionArray} onHide={() => setModalShow(false)} />
        <ShowQuestions />
        <RedirectModal isAnswering={false} show={successModalShow} />


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
        <QuestionForm setErrorMessage={props.setErrorMessage} showMessageModal={props.showMessageModal} closeModal={props.closeModal} questionArray={props.questionArray} setQuestionArray={props.setQuestionArray} />
      </Modal.Body>
    </Modal>
  );
}


function QuestionForm(props) {

  const [questionTitle, setQuestionTitle] = useState("");


  const [multipleAnswers, setMultipleAnswers] = useState(["", "", "", "", "", "", "", "", "", ""]);

  const [isOptional, setIsOptional] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleSetMin = (e) => { setMin(parseInt(e.target.value)); };
  const handleSetMax = (e) => { setMax(parseInt(e.target.value)); };



  function handleChange(index, event) {
    const multAnsw = [...multipleAnswers];
    multAnsw.splice(index, 1, event.target.value)
    setMultipleAnswers(multAnsw);
  }



  const handleForm = (event) => {
    event.preventDefault();

    let closedOptions = multipleAnswers.filter(string => string.trim());
    let answerToQuestion = [];
    if (isMultiple)
      for (let i = 0; i < closedOptions.length; i++)
        answerToQuestion.push(false);
    else
      answerToQuestion = "";

    //consideriamo la risposta multipla
    if (!questionTitle.trim()) {
      props.setErrorMessage("Insert the question title");
      props.showMessageModal();
      return;
    }

    if (isMultiple && (max > closedOptions.length || min > closedOptions.length || min > max || max === 0)) {
      props.setErrorMessage("Insert valid values in closed-answer question");
      props.showMessageModal();
      return;
    }


    let answer = { title: questionTitle, isMultiple: isMultiple, isOptional: isOptional, multipleAnswers: closedOptions, max: max, min: min, answerToQuestion: answerToQuestion };

    props.setQuestionArray([...props.questionArray, answer]);

    props.closeModal();



  }

  return (
    <>
      <Container>

        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>Title of the question</Form.Label>
          <Form.Control type='text' value={questionTitle} onChange={(event) => { setQuestionTitle(event.target.value) }} /><br />

          <Form.Check type="checkbox" checked={isMultiple} id="multiple" custom onChange={(event) => { setIsMultiple(event.target.checked) }} label="Multiple Answer" /><br />

          {isMultiple ? <Row><Col><SelectElement title="Min" actuallySelected={min} handleSelect={handleSetMin} /></Col>
            <Col><SelectElement title="Max" handleSelect={handleSetMax} actuallySelected={max} /></Col></Row> : ""}

          {isMultiple ?

            multipleAnswers.map((val, i) =>
              <div key={i} className="createSurBetweenFormsMargin">
                <Form.Label> Option number {i + 1}</Form.Label>
                <Form.Control type='text' value={val} onChange={(event) => { handleChange(i, event) }} />
              </div>
            )
            :
            <div> <Form.Check type="checkbox" checked={isOptional} id="optional" custom onChange={(event) => { setIsOptional(event.target.checked) }} label="Optional" /><br /></div>

          }

        </Form>
      </Container>
      <Modal.Footer>
        <Button onClick={props.closeModal} variant="secondary">Cancel</Button>
        <Button onClick={handleForm} variant="success">Add question</Button>
      </Modal.Footer>


    </>
  );
}



function SelectElement(props) {

  return (
    <>
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
    </>
  );
}

//TODO considerare i casi in cui il caricamento del db fa cilecca



export default CreateSurvey;

