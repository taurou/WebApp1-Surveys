import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

function Surveys(props) {
    // const [modalShow, setModalShow] = useState(false);

    // async function addTask(newTask) {
    //   await fetch('/api/tasks', {method : 'POST', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //       },
    //     body: JSON.stringify(newTask)
    //   });
    //  // props.setTask(oldTasks => [...oldTasks, newTask]);
    //  props.setUpdate(true);

    // }

    return (
      <>
      <Link to="/adminpanel/newsurvey"><Button className="fixed-right-bottom" >
       Create new survey </Button>
        </Link>
      </>
    );
}

export default Surveys;
