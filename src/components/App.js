import AppRouter from "components/Router";
import {useEffect, useState} from "react";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);

            }
            setInit(true)
        })
    }, [])

    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn}/>
            <footer>&copy; {new Date().getFullYear()} Wtwitter</footer>
        </>
    )
}

export default App;
