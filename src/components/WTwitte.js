import React, {useState} from "react";
import {dbService, storageService} from "fBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

function WTwitte({wTwitteObj, isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newWTwitte, setNewWTwitte] = useState(wTwitteObj.text);

    async function onDeleteClick() {
        const ok = window.confirm("정말 지울꺼에요?")
        if (ok) {
            await dbService.doc(`wTwittes/${wTwitteObj.id}`).delete()
            await storageService.refFromURL(wTwitteObj.attachmentUrl).delete()
        }
    }

    function toggleEditing() {
        setEditing(function (prev) {
            return !prev
        })
    }

    async function onSubmit(event) {
        event.preventDefault()
        await dbService.doc(`wTwittes/${wTwitteObj.id}`).update({text: newWTwitte})
        setEditing(false);
    }

    function onChange(event) {
        const {target: {value}} = event
        setNewWTwitte(value)
    }

    return (
        <div className="wTwitte">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container wTwitteEdit">
                        <input type='text' placeholder='너의 바뀐 기분을 속삭여줄래' value={newWTwitte} required
                               onChange={onChange} className="formBtn"/>
                        <input type='submit' value='수정완료' className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                </>
            ) : (
                <>
                    <h4>{wTwitteObj.text}</h4>
                    {wTwitteObj.attachmentUrl && (
                        <img src={wTwitteObj.attachmentUrl} alt=""/>
                    )}
                    {isOwner && (
                        <div>
                            <div className="wTwitte__actions"/>
                            <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash}/></span>
                            <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt}/></span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default WTwitte