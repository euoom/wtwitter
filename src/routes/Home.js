import React, {useEffect, useState} from "react"
import {collection, dbService, onSnapshot, orderBy, query} from "fBase";
import WTwitte from "components/WTwitte";
import WTwitteFactory from "components/WTwitteFactory";

function Home({userObj}) {
    const [wTwittes, setWTwitte] = useState([])

    useEffect(function () {
        const q = query(collection(dbService, 'wTwittes'), orderBy('createdAt', 'desc'))
        onSnapshot(q, function (snapshot) {
            const wTwitteArray = snapshot.docs.map(function (doc) {
                return ({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setWTwitte(wTwitteArray)
        })
    }, [])

    return (
        <div className="container">
            <WTwitteFactory userObj={userObj}/>
            <div style={{marginTop: 30}}>
                {wTwittes.map(function (wTwitte) {
                    return (
                        <WTwitte key={wTwitte.id} wTwitteObj={wTwitte} isOwner={wTwitte.creatorId === userObj.uid}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
