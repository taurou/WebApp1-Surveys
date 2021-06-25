import {  Container, Form, Card, ListGroup } from 'react-bootstrap';

//props.isAnswering serve 
function ShowQuestions(props) {

    function handleChange(i,j,val, max){
        let obj = {...props.questions}; //TODO vedere shallow o hard
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
<Container>
        <div style={{ margin: '4rem 0px 0px' }}>
            <h3>Survey: {props.questions.nameSurvey}</h3>
            {props.isAnswering ? "" : <p className=" font-italic font-weight-light" >User: {props.username}</p> }
            {props.questions.questionArray.map((val, i) => {

                return (
                    <Card key={val.title} style={{ margin: '7px 0px 0px' }}>
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

                                    return ( 
                                            <Form.Check key={val.title+"_"+j} checked={props.questions.questionArray[i].answerToQuestion[j]} 
                                            disabled={props.isAnswering ? false : true }
                                            onChange={ (event) => handleChange(i, j, event.target.checked, props.questions.questionArray[i].max )  }
                                            style={{ margin:"1rem"} }id={(j+1)+(i+1)*100} name={i} type={props.questions.questionArray[i].max === 1 ? "radio" : "checkbox" }  label = {answer}>
                                                </Form.Check>
                                    )
                                })
                                : 
                                <Form.Control value={props.questions.questionArray[i].answerToQuestion} disabled={props.isAnswering ? false : true } onChange={  (event) => handleChange(i, -1, event.target.value, -1 ) } maxLength="200" rows={3}  as="textarea" />
                                
                            }
                            
                            </Form>
                        </ListGroup >
                    </Card>
            )})}
        </div>
        </Container>
    );
}

export default ShowQuestions