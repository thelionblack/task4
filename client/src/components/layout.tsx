import React, {useContext, useEffect, useState} from 'react';
import {Nav, Navbar, NavLink} from "react-bootstrap";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {isAuthContext} from "./Context";

const Layout = () => {
    const {isAuth, setIsAuth} = useContext(isAuthContext)
    const navigate = useNavigate()
    const logOut = async (e: React.MouseEvent) => {
        if (!isAuth) return
        localStorage.removeItem('token')
        setIsAuth(false)
    }
    useEffect(() => {
        if (!isAuth) navigate('/')
    }, [isAuth])

    return (
        <>
            <Navbar bg='dark' variant='dark'>
                <Nav className='m-auto'>
                    <Link className={'p-1'} to={isAuth ? '/auth' : '/'} onClick={logOut}>
                        Log in / out
                    </Link>
                    {isAuth ? '' : <Link className={'p-1'} to='/Registration'>Registration</Link>}
                </Nav>
            </Navbar>
            <Outlet />
        </>
    );
};

export default Layout;