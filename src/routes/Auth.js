import React from "react";
import {authService} from "fBase";
import AuthForm from "components/AuthForm";
import {GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons"
import "./Auth.css"

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
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="3x" style={{marginBottom: 30}}/>
            <AuthForm/>
            <div className="authBtns">
                <button className="authBtn" name="google" onClick={onSocialClick}><FontAwesomeIcon icon={faGoogle}/> 구글계정으로 로그인</button>
                <button className="authBtn" name="github" onClick={onSocialClick}><FontAwesomeIcon icon={faGithub}/> 깃허브계정으로 로그인</button>
            </div>
        </div>
    )
}

export default Auth
