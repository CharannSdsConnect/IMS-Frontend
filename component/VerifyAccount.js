import { Container, Row, Col } from "react-bootstrap";
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";

export default function VerifyAccount() {
    const [validated, setValidated] = useState(false);
    const usernameRef = useRef()
    const otpRef = useRef()

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    function sendData() {
        const userData = { email: usernameRef.current.value, otp: otpRef.current.value };
        axios.post('http://localhost:8080/verify-account',userData)
    .then(response => {
        console.log('Login successful:', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    }

    return (
        <Container className="">
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
                    <Form.Group md="4" controlId="validationCustom02">
                        <Form.Label>Otp</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Password"
                            style={{ width: '50%' }}
                            ref={otpRef}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>


                </Row>
                <br></br>
                <Button onClick={sendData}>Submit</Button>
                <Button onClick={sendData}>Send Email</Button>
            </Form>


        </Container>
    );
}