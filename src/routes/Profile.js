import React, {useEffect, useState} from "react";
import {authService, dbService} from "fBase";
import {useNavigate} from "react-router-dom";

function Profile({refreshUser, userObj}) {
    const navigate = useNavigate()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    function onLogOutClick() {
        authService.signOut()
        navigate('/')
    }

    async function getMyWTweets() {
        const wtweets = await dbService.collection('wtweets').where('creatorid', '==', userObj.uid).orderBy('createAt').get()
        console.log(wtweets.docs.map(function (doc) {
            return doc.data()
        }))
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

    useEffect(function () {
        getMyWTweets()
    }, [])

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type={"text"} placeholder={"보여주고싶은 닉네임"} value={newDisplayName}/>
                <input type={"submit"} value={"수정완료"}/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;
