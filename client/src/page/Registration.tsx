import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {UserContext} from "../components/Context";
import {useNavigate} from "react-router-dom";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorText, setError] = useState('');
    const {table, setTable} = useContext(UserContext)
    const navigate = useNavigate();


    const registration = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        if(!name && !email && !password) {
            setError('Please fill out all fields and try again')
            return false
        }
        const response = await fetch('https://task4server-wwgb.onrender.com/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const data = await response.json()
        if (data.status !== 200) {
            setError(data.message)
            return false
        }
        localStorage.setItem('token', data.token)
        setTable(data.table)
    }

  return (
    <Form onSubmit={registration}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
                          placeholder="Enter email"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
            />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          placeholder="Password"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
                          placeholder="Name"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
            />
        </Form.Group>
        <p className='error h6 text-danger mt-2'>{errorText}</p>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  );
}

export default Registration;