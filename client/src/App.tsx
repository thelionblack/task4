import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Registration from "./page/Registration";
import Layout from "./components/layout";
import {UserProvider} from "./components/Context";
import HomePage from "./page/HomePage";
import Auth from "./page/Auth";

function App() {


  return (
    <>
        <UserProvider>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<HomePage />} />
                    <Route path='registration' element={<Registration />} />
                    <Route path='auth' element={<Auth />} />
                </Route>
            </Routes>
        </UserProvider>
    </>
  );
}

export default App;
