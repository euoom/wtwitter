import React, {useState, useEffect} from "react"
import {dbService} from "fBase";
import {collection, onSnapshot, query, orderBy,} from "firebase/firestore"

const Home = ({userObj}) => {
    const [wTweet, setWTweet] = useState("")
    const [wTweets, setWTweets] = useState([])

    useEffect(() =>{
        const q = query(collection(dbService, 'wtweets'), orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const wTweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setWTweets(wTweetArray)
        })
    }, [])


    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection('wtweets').add({
            text: wTweet,
            createdAt: Date.now(),
            createdID: userObj.uid,
        })
        setWTweet("");
    }

    const onChange = (event) => {
        const {target: {value}} = event
        setWTweet(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="설명 텍스트" maxLength={120} value={wTweet} onChange={onChange}/>
                <input type="submit" value="Wtweeter"/>
            </form>
            <div>
                {wTweets.map((wTweet) => (
                    <div key={wTweet.id}>
                        <h4>{wTweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home