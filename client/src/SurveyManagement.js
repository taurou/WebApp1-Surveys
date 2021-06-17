import plus from './plus.png';
import { Link } from "react-router-dom";

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
      <Link to="/adminpanel/newsurvey">
        <img className="fixed-right-bottom"  src={plus} width="50" height="50" alt="plus" type="button" />
        </Link>
      </>
    );
}

export default Surveys;
