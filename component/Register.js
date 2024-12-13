import { Container, Row, Col, Modal } from "react-bootstrap";
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import verifyAccount from "./VerifyAccount";
import axios from "axios";
import VerifyAccount from "./VerifyAccount";
// import { Router } from "react-router-dom";
import ReactPasswordChecklist from "react-password-checklist";

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nameRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    // const ageRef = useRef()
    const roleRef = useRef()
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
        
        const userData = { 
            name: nameRef.current.value, 
            email: usernameRef.current.value, 
            password: passwordRef.current.value, 
            // age: ageRef.current.value,
            role: otpRef.current.value,
            otp: roleRef.current.value 
        };
        axios.post('http://localhost:8080/register', userData)
            .then(response => {
                console.log('Registeration successful:', response.data);
                handleShow();

            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });


    }
    function sendEmail() {
        document.getElementById("register").style.display="block";
        document.getElementById("sendmail").style.display= "block";
        document.getElementById("otpfield").style.display="block";
        const userData = { email: usernameRef.current.value, otp: otpRef.current.value };
        axios.post('http://localhost:8080/verify-account',userData)
    .then(response => {
        console.log('Email sent:', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    }

    return (
        <Container className="registration-div">
            <Form noValidate validated={validated} onSubmit={handleSubmit} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Your name"
                            style={{ width: '50%' }}
                            ref={nameRef}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom2">
                        <Form.Label>Email Id (username)</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            style={{ width: '50%' }}
                            ref={usernameRef}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group md="4" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            style={{ width: '50%' }}
                            ref={passwordRef}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <ReactPasswordChecklist
                            rules={["minLength","specialChar","number","capital"]}
                            minLength={6}
                            value={password}
                            onChange={(isValid) => {}}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom5">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Role"
                            style={{ width: '50%' }}
                            ref={roleRef}
                        />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>
                </Row>
                <Row>
                    {/* <Form.Group md="4" controlId="validationCustom04">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Your age"
                            style={{ width: '50%' }}
                            ref={ageRef}
                        /> */}
                        
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    {/* </Form.Group> */}
                    <div id="otpfield" style={{display:"none"}}>
                    <Form.Group md="4" controlId="validationCustom05">
                        <Form.Label>Otp</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter otp"
                            style={{ width: '50%' }}
                            ref={otpRef}
                        />
                        
                    </Form.Group>
                    </div>
                    
                </Row>
                <br></br>
                <div id="register" style={{display:"none"}}>
                    <Button onClick={sendData} >Register</Button>
                </div>
                
                <div id="sendmail">
                    <Button type='submit' onClick={sendEmail}>Send Email</Button>
                </div>
                
                {/* <Modal show={show} >
                    <Modal.Header >
                        <Modal.Title>Verification</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body><VerifyAccount /></Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal> */} 
                

            </Form>

        </Container>
    );
}