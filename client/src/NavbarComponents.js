import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

function NavigationBar(props) {
  
  return (
    <Navbar className="fixed-top" bg="info">
      <Navbar.Brand href="/" /* className={props.login ? '' : 'justify-content-center'} */ >
      <svg className="bi bi-check-all" width="23" height="23" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
         </svg>
        <span class=" whitetext" > Survey{/* {props.login ? 'Survey' : 'ToDo Manager Login'} */} </span>
      </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
            <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
          </svg>
          <Button className="whitetext" variant="dark" onClick={props.logout}>Logout</Button>
        </Navbar.Collapse>

    </Navbar>
  );
}


export default NavigationBar;