import React, {useState} from "react"
import {dbService} from "fBase";

const Home = () => {
    const [wTweet, setWTweet] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection('wtweets').add({
            wTweet,
            createdAt: Date.now(),
        })
        console.log('123')
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
            Home
        </div>
    )
}
export default Home