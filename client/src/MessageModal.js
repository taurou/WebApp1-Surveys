import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function MessageModal(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton onClick={props.handleClose}></Modal.Header>
      <Modal.Body className={props.message.type} onClose={() => props.setMessage('')}>
        {props.message.msg}
      </Modal.Body>
    </Modal>
  );
}

function MessageModalLite(props) {

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header className="text-center font-weight-bold" closeButton onClick={props.handleClose}>{props.message}</Modal.Header>
    </Modal>
  );
}

function RedirectModal(props) {

  return (
    <Modal
      show={props.show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {props.isAnswering ? "Answer successfully submitted!" : "Survey successfully added!"}
      </Modal.Body>
      <Modal.Footer>
        <Link to={props.isAnswering ? "/" : "/adminpanel"}><Button variant="secondary">{props.isAnswering ? "Go back to Home Page" : "Go back to Administration Menu"}</Button> </Link>
      </Modal.Footer>

    </Modal>
  );
}



export { MessageModal, MessageModalLite, RedirectModal };