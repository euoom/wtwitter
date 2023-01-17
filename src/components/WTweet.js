import React, {useState} from "react";
import {dbService, storageService} from "fBase";

function WTweet({wtweetObj, isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newWTweet, setNewWTweet] = useState(wtweetObj.text);

    async function onDeleteClick() {
        const ok = window.confirm("정말 지울꺼에요?")
        if (ok) {
            await dbService.doc(`wtweets/${wtweetObj.id}`).delete()
            await storageService.refFromURL(wtweetObj.attachmentUrl).delete()
        }
    }

    function toggleEditing() {
        setEditing(function (prev) {
            return !prev
        })
    }

    async function onSubmit(event) {
        event.preventDefault()
        await dbService.doc(`wtweets/${wtweetObj.id}`).update({text: newWTweet})
        setEditing(false);
    }

    function onChange(event) {
        const {target: {value}} = event
        setNewWTweet(value)
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type='text' placeholder='너의 바뀐 기분을 속삭여줄래' value={newWTweet} required
                               onChange={onChange}/>
                        <input type='submit' value='수정완료'/>
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
                    <h4>{wtweetObj.text}</h4>
                    {wtweetObj.attachmentUrl && (
                        <img src={wtweetObj.attachmentUrl} width="50px" alt=""/>
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>삭제</button>
                            <button onClick={toggleEditing}>수정</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default WTweet