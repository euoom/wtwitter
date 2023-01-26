import AppRouter from "components/Router"
import {useEffect, useState} from "react"
import {authService} from "fBase"

function App() {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null)

    useEffect(function () {
        authService.onAuthStateChanged(function (user) {
            if (user) {
                // setUserObj(user)
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: function (args) {
                        return user.updateProfile(args)
                    }
                })
            } else {
                setUserObj(null)
            }
            setInit(true)
        })
    }, [])

    function refreshUser() {
        const user = authService.currentUser
        setUserObj({
            displayName: user.displayName,
            uid:user.uid,
            updateProfile: function(args){return user.updateProfile(args)}
        })
    }

    return (
        <>
            {
                init ? (
                    <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>
                ) : (
                    "Initialization..."
                )
            }
            {/*<footer>&copy; {new Date().getFullYear()} WTwitter</footer>*/}
        </>
    )
}

export default App
