import React, {useState} from "react";
import {authService} from "fBase";
import {useNavigate} from "react-router-dom";
import "./Profile.css"

function Profile({refreshUser, userObj}) {
    const navigate = useNavigate()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    function onLogOutClick() {
        authService.signOut()
        navigate('/')
    }

    function onChange(event) {
        const {target: {value}} = event
        setNewDisplayName(value)
    }

    async function onSubmit(event) {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName})
            refreshUser();
        }
    }
    
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={onChange} 
                    type="text"
                    autoFocus
                    placeholder="보여주고싶은 닉네임"
                    value={newDisplayName} 
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="수정완료" 
                    className="formBtn" 
                    style={{marginTop: 10}}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>로그아웃</span>
        </div>
    )
}

export default Profile;
