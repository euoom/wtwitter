import AppRouter from "components/Router";
import {useEffect, useState} from "react";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    const [userObj, setUserObj] = useState(null);

    useEffect(function () {
        authService.onAuthStateChanged(function (user) {
            if (user) {
                // setIsLoggedIn(true);
                setUserObj(user);
            }
            // else {
                // setIsLoggedIn(false);
            // }
            setInit(true)
        })
    }, [])

    return (
        <>
            {
                init ? (
                    <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/>
                ) : (
                    "Initialization..."
                )
            }
            <footer>&copy; {new Date().getFullYear()} WTwitter</footer>
        </>
    )
}

export default App;
