import React, {useContext, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {isAuthContext, UserContext} from "../components/Context";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setError] = useState('')
    const {setTable} = useContext(UserContext)
    const {isAuth, setIsAuth} = useContext(isAuthContext)
    const navigate = useNavigate()


    const login = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!email && !password) {
            setError('Enter you email and password')
            return false
        }
        const response = await fetch('https://task4server-wwgb.onrender.com/api/login', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
        localStorage.setItem('email', data.userEmail)
        setTable(data.table)
        setIsAuth(true)
        navigate("/auth");
    }

    return (
        <Form onSubmit={login}>
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
            <p className='error h6 text-danger mt-2'>{errorText}</p>
            <Button variant="primary" type="submit">
                Log in
            </Button>
        </Form>
    );
};

export default Login;