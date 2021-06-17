import {Col, Row, Container, Select, Navbar, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { useState } from 'react' ;

function CreateSurvey(props){
    
    const [modalShow, setModalShow] = useState(true);

    return ( 
        <NewQuestionModal show={modalShow}  onHide={() => setModalShow(false)}   /> 

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
        <QuestionForm isAdding={true} />
        </Modal.Body>
      </Modal>
    );
  }


  function QuestionForm(props) {

    const [questionTitle, setQuestionTitle] = useState("");
    const [important, setImportant] = useState(false);
    const [privatez, setPrivatez] = useState(false);
    const [deadline, setDeadline] = useState("");
    const [hour, setHour] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [concluded, setConcluded] = useState(false);

    const [multipleAnswers, setMultipleAnswers] = useState(["prova", "1", "2", "", "", "", "", "", "", ""]); 
    
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
        setConcluded(true);
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


    {isMultiple ? <p><Container><Row><Col><SelectElement title="Min" actuallySelected={min}  handleSelect={handleSetMin}/></Col>
            <Col><SelectElement title="Max" handleSelect={handleSetMax} actuallySelected={max}/></Col></Row></Container></p> : "" }

        { isMultiple ?  

        multipleAnswers.map((val, i) => 
        <p> 

        <Form.Label> Option number {i+1}</Form.Label>
        <Form.Control type='text' value={val} onChange={(event) => { handleChange(i, event) }} />
        </p> 
        )


        :  <div> <Form.Check type="checkbox" checked={isOptional} id="optional" custom onChange={(event) => { setIsOptional(event.target.checked) }} label="Optional" /><br /></div>
 
        
         }

          <Modal.Footer>
            <Button onClick={props.closeModal} variant="secondary">Cancel</Button><br />
            <Button onClick={handleForm}>Add question</Button><br />
          </Modal.Footer>
  
        </Form>
      </>
    );
  }
  








export default CreateSurvey;


function SelectElement(props){
    
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
</Form>    );
}

