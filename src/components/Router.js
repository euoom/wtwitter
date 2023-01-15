import React, {useState} from "react";
import {HashRouter, Routes, Route} from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn}) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ?
                    <>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Profile" element={<Profile/>}/>
                    </>
                    : <>
                        <Route path="/" element={<Auth/>}/>
                    </>
                }
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;