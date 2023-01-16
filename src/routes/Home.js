import React, {useState} from "react"

const Home = () => {
    const [wTweet, setWTweet] = useState("")
    const onSubmit = (event) => {
        event.preventDefault()
    }
    const onChange = (event) => {
        const {target: {value}} = event
        setWTweet(value)
    }
    return (
        <div>
            <form>
                <input type="text" placeholder="설명 텍스트" maxLength={120} value={wTweet} onChange={onChange}/>
                <input type="submit" value="Wtweeter" onSubmit={onSubmit}/>
            </form>
            Home
        </div>
    )
}
export default Home