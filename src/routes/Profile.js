import React from "react";
import {authService} from "fBase";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const history = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;