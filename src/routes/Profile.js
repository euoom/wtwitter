import React, {useEffect} from "react";
import {authService, dbService} from "fBase";
import {useNavigate} from "react-router-dom";

function Profile({userObj}) {
    const navigate = useNavigate()

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

    useEffect(function () {
        getMyWTweets()
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;
