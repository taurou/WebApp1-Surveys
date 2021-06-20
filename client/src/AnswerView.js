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
    const [answerIdArray,setAnswerIdArray] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState("");

    useEffect(() => {
        const getAnswerIdArray = async () => {
            const answersId = await API.getAnswerIDs(id);
            let array = [] ;
            answersId.map((a)=> array.push(a.AnswerId));
            console.log(array);
            setAnswerIdArray(array);
        };

        getAnswerIdArray(id).catch(err => {
            alert('error while getting survey!')
        });
        
    }, []);

return null;

}

export default ViewAnswers