import React, {useEffect, useState} from "react"
import {collection, dbService, onSnapshot, orderBy, query} from "fBase";
import WTweet from "components/WTweet";
import WTweetFactory from "components/WTweetFactory";

function Home({userObj}) {
    const [wTweets, setWTweets] = useState([])

    useEffect(function () {
        const q = query(collection(dbService, 'wTweets'), orderBy('createdAt', 'desc'))
        onSnapshot(q, function (snapshot) {
            const wTweetArray = snapshot.docs.map(function (doc) {
                return ({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setWTweets(wTweetArray)
        })
    }, [])

    return (
        <div className="container">
            <WTweetFactory userObj={userObj}/>
            <div style={{marginTop: 30}}>
                {wTweets.map(function (wTweet) {
                    return (
                        <WTweet key={wTweet.id} wTweetObj={wTweet} isOwner={wTweet.creatorId === userObj.uid}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
