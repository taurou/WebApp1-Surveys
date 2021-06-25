import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import { MessageModal } from './MessageModal.js'

function LoginForm(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    const credentials = { username, password };
    let valid = true;

    if (!username.trim()) {
      valid = false
      setErrorMessage({ msg: "Please insert username!", type: 'danger' });
    }


    if (!password.trim() || password.length < 6) {
      valid = false
      setErrorMessage({ msg: "Please insert a password with at least 6 characters!", type: 'danger' });
    }

    if (valid) {
      props.login(credentials);
    } else {
      props.handleShow();
    }
  };

  return (
    <Row className="login">

    <Col md={4} lg={4} className="center">

      <Form>
        {errorMessage ? <MessageModal setMessage={props.setMessage} handleClose={props.handleClose} message={errorMessage} show={props.show} /> : ''}
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' value={username} onChange={ev => setUsername(ev.target.value)} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
        </Form.Group>
        <ButtonGroup className="d-flex">
          <Button onClick={handleSubmit} variant='success'>Login</Button>
        </ButtonGroup>
      </Form>
    </Col>
    </Row>);
}

export default LoginForm;