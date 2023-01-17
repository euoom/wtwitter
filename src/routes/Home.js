import React, {useEffect, useState} from "react"
import {collection, dbService, onSnapshot, orderBy, query} from "fBase";
import WTweet from "components/WTweet";
import WTweetFactory from "components/WTweetFactory";

function Home({userObj}) {
    const [wTweets, setWTweets] = useState([])

    useEffect(function () {
        const q = query(collection(dbService, 'wtweets'), orderBy('createdAt', 'desc'))
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
        <>
            <WTweetFactory userObj={userObj}/>
            <div>
                {wTweets.map(function (wTweet) {
                    return (
                        <WTweet key={wTweet.id} wtweetObj={wTweet} isOwner={wTweet.creatorId === userObj.uid}/>
                    )
                })}
            </div>
        </>
    )
}

export default Home
