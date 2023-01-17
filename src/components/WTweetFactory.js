import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {storageService, dbService} from "fBase";

function WTweetFactory({userObj}) {
    const [wTweet, setWTweet] = useState("")
    const [attachment, setAttachment] = useState("")

    async function onSubmit(event) {
        event.preventDefault()
        let attachmentUrl = ""

        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL()
        }
        const wTweetObj = {
            text: wTweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection('wtweets').add(wTweetObj)
        setWTweet("");
        setAttachment("");
    }

    function onChange(event) {
        const {target: {value}} = event
        setWTweet(value)
    }

    function onFileChange(event) {
        const {target: {files}} = event
        const theFile = files[0]
        const reader = new FileReader()

        reader.onloadend = function (finishedEvent) {
            const {currentTarget: {result}} = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }

    function onClearAttachment() {
        setAttachment("");
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="설명 텍스트" maxLength={120} value={wTweet} onChange={onChange}/>
            <input type="file" accept="images/*" onChange={onFileChange}/>
            <input type="submit" value="등록"/>
            {attachment && (
                <div>
                    <img src={attachment} alt='' width='50px' height='50px'/>
                    <button onClick={onClearAttachment}>이미지 비우기</button>
                </div>
            )}
        </form>
    )
}

export default WTweetFactory