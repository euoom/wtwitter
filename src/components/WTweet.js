import React, {useState} from "react";
import {dbService, storageService} from "fBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

function WTweet({wTweetObj, isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newWTweet, setNewWTweet] = useState(wTweetObj.text);

    async function onDeleteClick() {
        const ok = window.confirm("정말 지울꺼에요?")
        if (ok) {
            await dbService.doc(`wTweets/${wTweetObj.id}`).delete()
            await storageService.refFromURL(wTweetObj.attachmentUrl).delete()
        }
    }

    function toggleEditing() {
        setEditing(function (prev) {
            return !prev
        })
    }

    async function onSubmit(event) {
        event.preventDefault()
        await dbService.doc(`wTweets/${wTweetObj.id}`).update({text: newWTweet})
        setEditing(false);
    }

    function onChange(event) {
        const {target: {value}} = event
        setNewWTweet(value)
    }

    return (
        <div className="wTweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container wTweetEdit">
                        <input type='text' placeholder='너의 바뀐 기분을 속삭여줄래' value={newWTweet} required
                               onChange={onChange} className="formBtn"/>
                        <input type='submit' value='수정완료' className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                </>
            ) : (
                <>
                    <h4>{wTweetObj.text}</h4>
                    {wTweetObj.attachmentUrl && (
                        <img src={wTweetObj.attachmentUrl} alt=""/>
                    )}
                    {isOwner && (
                        <div>
                            <div className="wTweet__actions"/>
                            <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash}/></span>
                            <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt}/></span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default WTweet