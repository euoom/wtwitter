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
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}>
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home userObj={userObj}/>}/>
                            <Route path="/Profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
                        </>
                    ) : (
                        <Route path="/" element={<Auth/>}/>
                    )}
                </Routes>
            </div>
        </HashRouter>
    )
}

export default AppRouter;