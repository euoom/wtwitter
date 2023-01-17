import React, {useState} from "react";
import {authService} from "fBase";
import AuthForm from "components/AuthForm";
import {GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";


function Auth() {
    async function onSocialClick(event) {
        const {target: {name}} = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <AuthForm/>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth
