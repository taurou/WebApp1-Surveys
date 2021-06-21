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

    
    function handle(direction){
        if(direction==="right")
            if(selectedAnswerArrayIndex < answerIdArray.length -1 )
                setSelectedAnswerArrayIndex(oldVal => oldVal +1 );
        if(direction==="left")
            if(selectedAnswerArrayIndex !== 0  )
                setSelectedAnswerArrayIndex(oldVal => oldVal -1 );


    }
if(answer)
    return <>
    <Button variant="transparent" className="fixed-left-middle shadow-none" onClick={() => handle("left")} ><svg   xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg>
</Button>
<Button variant="transparent" className=" fixed-right-middle shadow-none" onClick={() => handle("right")} >
<svg  xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
</Button>

    <ShowQuestions username={username} isAnswering={false} questions={answer}  /> 
    </>
    ;
    else return "" ;

}

export default ViewAnswers