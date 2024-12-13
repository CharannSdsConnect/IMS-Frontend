import { Container, Row, Col } from "react-bootstrap";
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import "./Login.css";

export default function Login() {
    const [validated, setValidated] = useState(false);
    const usernameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    function sendData() {
        const userData = { email: usernameRef.current.value, password: passwordRef.current.value };
        axios.post('http://localhost:8080/login',userData)
    .then(response => {
        console.log('Login successful:', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    }

    return (
        <Container className="login-div">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            style={{ width: '50%' }}
                            ref={usernameRef}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group md="4" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            style={{ width: '50%' }}
                            ref={passwordRef}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>


                </Row>
                <br></br>
                <Button onClick={sendData}>Login</Button>
            </Form>


        </Container>
    );
}