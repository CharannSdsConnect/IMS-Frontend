import { Container, Row, Col, Modal } from "react-bootstrap";
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "./Login.css";


export default function Report() {

    function generateDailyReport() {
        // const userData = { email: usernameRef.current.value, password: passwordRef.current.value };
        axios.get('http://localhost:8080/daily-sales-report')
    .then(response => {
        console.log('Daily Report Generated', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    }

    function downloadDailyReport() {
        // const userData = { email: usernameRef.current.value, password: passwordRef.current.value };
        axios.get('http://localhost:8080/download-daily-report')
    .then(response => {
        console.log('Daily Report Generated', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    }


    function generateMonthlyReport() {
        axios.get('http://localhost:8080/monthly-sales-report')
    .then(response => {
        console.log('Daily Report Downloaded', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    } 

    
    function generateYearlyReport() {
        axios.get('http://localhost:8080/yearly-sales-report')
    .then(response => {
        console.log('Daily Report Generated', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    } 
    

    function generateExpiryReport() {
        axios.get('http://localhost:8080/get-expiry-report')
    .then(response => {
        console.log('Expiry Report Generated', response.data);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
    } 
      return (
        <Container>
            <Button onClick={generateDailyReport}>Daily Report</Button>
            <a href="http://localhost:8080/download-daily-report" onClick={downloadDailyReport}>Download Daily Report</a><hr></hr>
            <Button onClick={generateMonthlyReport}>Monthly Report</Button>
            <a href="http://localhost:8080/download-monthly-report">Download Monthly Report</a><hr></hr>
            <Button onClick={generateYearlyReport}>Yearly Report</Button>
            <a href="http://localhost:8080/download-yearly-report">Download Yearly Report</a><hr></hr>
            <Button onClick={generateExpiryReport}>Expiry Report</Button>
            <a href="http://localhost:8080/download-expiry-report">Download Expiry Report</a><hr></hr>
        </Container>
        
    )
}
