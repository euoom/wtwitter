import React, {useState, useEffect} from "react"
import {dbService} from "fBase";
import {collection, onSnapshot, query, orderBy,} from "firebase/firestore"
import WTweet from "../components/WTweet";

function Home({userObj}) {
    const [wTweet, setWTweet] = useState("")
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


    async function onSubmit(event) {
        event.preventDefault()
        await dbService.collection('wtweets').add({
            text: wTweet,
            createdAt: Date.now(),
            createdID: userObj.uid,
        })
        setWTweet("");
    }

    function onChange(event) {
        const {target: {value}} = event
        setWTweet(value)
    }

    function onFileChange(event) {
        const {target:{files}} = event
        const theFile = files[0]
        const reader = new FileReader()

        reader.onloadend = function(finishedEvent){
            console.log(finishedEvent)
        }
        reader.readAsDataURL(theFile)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="설명 텍스트" maxLength={120} value={wTweet} onChange={onChange}/>
                <input type="file" accept="images/*" onChange={onFileChange}/>
                <input type="submit" value="등록"/>
            </form>
            <div>
                {wTweets.map(function (wTweet) {
                    return (
                        <WTweet key={wTweet.id} wtweetObj={wTweet} isOwner={wTweet.createdID === userObj.uid}/>
                    )
                })}
            </div>
        </>
    )
}

export default Home
