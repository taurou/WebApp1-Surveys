import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button, Form,FormGroup, Modal, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShowQuestions from './QuestionDisplayComponent.js';
import API from './API.js';

function ViewAnswers(props){
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [answer, setAnswer] = useState(null);
    const [answerIdArray,setAnswerIdArray] = useState(null);
    const [selectedAnswerArrayIndex, setSelectedAnswerArrayIndex] = useState(null);

    useEffect(() => {
        const getAnswerIdArray = async () => {
            const answersId = await API.getAnswerIDs(id);
            let array = [] ;
            answersId.map((a)=> array.push(a.AnswerId));
            setAnswerIdArray(array);
            setSelectedAnswerArrayIndex(0);

        };

        getAnswerIdArray().catch(err => {
            alert('no answers stored!')
        });
        
    }, []);

    useEffect(() => {
        if(selectedAnswerArrayIndex!==null){
        const getAnswer = async () => {
            const answer = await API.getAnswerById(answerIdArray[selectedAnswerArrayIndex]);
            setUsername(answer.Username);
            setAnswer(JSON.parse(answer.Questions));
        };

        getAnswer().catch(err => {
            alert('error while getting answer IDs!')
        });
    }
    }, [selectedAnswerArrayIndex]);

    

if(answer)
    return <ShowQuestions username={username} isAnswering={false} questions={answer}  /> ;
    else return "" ;

}

export default ViewAnswers