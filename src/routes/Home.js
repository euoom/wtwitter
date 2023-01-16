import React, {useState, useEffect} from "react"
import {dbService} from "fBase";

const Home = () => {
    const [wTweet, setWTweet] = useState("")
    const [wTweets, setWTweets] = useState([])

    const getWTeewts = async () => {
        const dbWTweets = await dbService.collection('wtweets').get();
        dbWTweets.forEach((document) => {
            const wTweetObject = {
                ...document.data(),
                id: document.id,
            }
            setWTweets((prev) => [wTweetObject, ...prev])
        })
    }
    useEffect(() =>{
        getWTeewts()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection('wtweets').add({
            wTweet,
            createdAt: Date.now(),
        })
        setWTweet("");
        console.log(wTweets)
        console.log(wTweets)
        console.log(wTweets)
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
                        <h4>{wTweet.wTweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home