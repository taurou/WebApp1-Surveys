import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import API from './API.js';

//...

function AnswerToSurvey(props) {
    const { id } = useParams();

    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const getSurveyById = async () => {
            const survey = await API.getSurveyById(id);
            setSurvey(survey)
            console.log(survey);
            console.log(survey.questionArray);
        };

        getSurveyById(id).catch(err => {
            alert('error while getting survey!')
        });
        
    }, []);
    if(survey)
    return  <ShowQuestions questions={survey.questionArray} />
    else return ""; 

}

function ShowQuestions(props) {
    return (

        <div style={{ margin: '5rem 0px 0px' }}>

            {props.questions.map((val, i) => {

                return (
                    <Card style={{ margin: '7px' }}>
                        <Card.Header>
                            Question {i + 1}: {val.title}
                        </Card.Header>
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
            )})};

        </div>

    );
}


export default AnswerToSurvey

