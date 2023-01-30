import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {storageService, dbService} from "fBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import "./WTwitteFactory.css"

function WTwitteFactory({userObj}) {
    const [wTwitte, setWTwitte] = useState("")
    const [attachment, setAttachment] = useState("")

    async function onSubmit(event) {
        event.preventDefault()
        if (wTwitte === "") {
            return
        }

        let attachmentUrl = ""

        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL()
        }
        const wTwitteObj = {
            text: wTwitte,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection('wTwittes').add(wTwitteObj)
        setWTwitte("");
        setAttachment("");
    }

    function onChange(event) {
        const {target: {value}} = event
        setWTwitte(value)
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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={wTwitte}
                    onChange={onChange}
                    type="text"
                    placeholder="너의 기분을 알고싶어"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>사진 올리기</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input
                id="attach-file"
                type="file"
                accept="images/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            <div className="factoryForm__attachment">
                <img
                    src={attachment}
                    alt=''
                    style={{backgroundImage: attachment,}}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
        </form>
    )
}

export default WTwitteFactory
