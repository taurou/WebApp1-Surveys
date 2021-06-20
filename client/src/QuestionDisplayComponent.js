import { useState, useEffect } from 'react';
import { Button, Form,FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';

//props.isAnswering serve 
function ShowQuestions(props) {

    function handleChange(i,j,val, max){
        let obj = {...props.questions};
        if(max === 1)
            for(let n = 0; n<obj.questionArray[i].answerToQuestion.length; n++ ){
                obj.questionArray[i].answerToQuestion[n]=!(val);
            }


        if(j!==-1){
        obj.questionArray[i].answerToQuestion[j]=val;
        }
        else
        {
        obj.questionArray[i].answerToQuestion=val;
        }

        props.setQuestions(obj);

    }


    return (

        <div style={{ margin: '4rem 0px 0px' }}>
            <h3>Survey: {props.questions.nameSurvey}</h3>
            {props.questions.questionArray.map((val, i) => {

                return (
                    <Card style={{ margin: '7px 0px 0px' }}>
                        <Card.Header>
                            Question {i + 1}: {val.title}
                            <Card.Subtitle className="text-right font-italic font-weight-light" >
                                {   val.isMultiple ? `min:${val.min} max:${val.max}` : val.isOptional ? "optional answer" : "mandatory answer"    }
                            </Card.Subtitle>

                        </Card.Header>
                        <ListGroup variant="flush">
                            <Form>
                            {val.isMultiple ? //se non funziona più, togliere questo!
                                
                                val.multipleAnswers.map((answer, j) => {

                                    return ( //TODO controllare se funziona anche senza return
                                            //TODO fare attenzione a questi id... comportamenti molto strani
                                            <Form.Check checked={props.questions.questionArray[i].answerToQuestion[j]} 
                                            disabled={props.isAnswering ? false : true }
                                            onChange={ (event) => handleChange(i, j, event.target.checked, props.questions.questionArray[i].max )  }
                                            style={{ margin:"1rem"} }id={(j+1)+(i+1)*100} name={i} type={props.questions.questionArray[i].max === 1 ? "radio" : "checkbox" }  label = {answer}>
                                                </Form.Check>
                                        
                                        // <ListGroup.Item>{j + 1}. {answer}</ListGroup.Item>
                                    )
                                })
                                : 
                                <Form.Control value={props.questions.questionArray[i].answerToQuestion} disabled={props.isAnswering ? false : true } onChange={  (event) => handleChange(i, -1, event.target.value, -1 ) } maxLength="200" rows={3}  as="textarea" /*value={pippo} onChange={(event)=>setPippo(event.target.value)}*/ />
                                
                            }
                            
                            </Form>
                        </ListGroup >
                    </Card>
            )})}
        </div>

    );
}

export default ShowQuestions