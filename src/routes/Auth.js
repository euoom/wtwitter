import React, {useState} from "react";
import {authService} from "fBase";
import {GithubAuthProvider, GoogleAuthProvider} from "@firebase/auth";

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState('');

    function onChange(event) {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault()
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password)
            } else {
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    function toggleAccount() {
        setNewAccount(function (prev) {
            return !prev
        })
    }

    async function onSocialClick(event) {
        const {target: {name}} = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                       onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log in"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth