import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import API from './API.js';

//...

function AnswerToSurvey(props){
    const { id } = useParams();

    const [ survey , setSurvey ] = useState(null);

    useEffect(() => {
        const getSurveyById = async () => {
          const survey = await API.getSurveyById(id);
          setSurvey(survey)
          console.log(survey);
        };
    
        getSurveyById(id).catch(err => {
          alert('error while getting survey!')
        });
    
      }, []);
      return <ShowQuestions questions={survey.questionArray} />
    
}

function ShowQuestions(props){
    return (   <>
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

export default AnswerToSurvey