import AppRouter from "components/Router";
import {useState} from "react";
import {authService} from "fBase";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn}/>
            <footer>&copy; {new Date().getFullYear()} Wtwitter</footer>
        </>
    )
}

export default App;
