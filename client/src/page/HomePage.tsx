import React, {useContext, useEffect} from 'react';
import Login from "./Login";
import {useNavigate} from "react-router-dom";
import Auth from "./Auth";
import {isAuthContext, UserContext} from "../components/Context";

const HomePage = () => {
    const {table, setTable} = useContext(UserContext)
    const {isAuth, setIsAuth} = useContext(isAuthContext)
    const navigate = useNavigate();


    return (
        isAuth ? <Auth /> : <Login />
    );
};

export default HomePage;