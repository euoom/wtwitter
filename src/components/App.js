import AppRouter from "components/Router";
import {useEffect, useState} from "react";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);

            }
            setInit(true)
        })
    }, [])

    return (
        <>
            {
                init ? (
                    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
                ) : (
                    "Initialization..."
                )
            }
            <footer>&copy; {new Date().getFullYear()} Wtwitter</footer>
        </>
    )
}

export default App;
