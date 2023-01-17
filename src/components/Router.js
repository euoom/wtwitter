import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

function AppRouter({refreshUser, isLoggedIn, userObj}) {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ?
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}/>
                        <Route path="/Profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
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