import React from "react";
import {authService} from "fBase";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate()

    function onLogOutClick() {
        authService.signOut()
        navigate('/')
    }

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile;