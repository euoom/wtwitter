import React, {useState} from "react";
import {authService} from "fBase";
import "./AuthForm.css"

function AuthForm() {
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



    return (
        <div>
            <form className="container" onSubmit={onSubmit}>
                <input className="authInput" name="email" type="email" placeholder="이메일주소" required value={email} onChange={onChange}/>
                <input className="authInput" name="password" type="password" placeholder="비밀번호" required value={password}
                       onChange={onChange}/>
                <input className="authInput authSubmit" type="submit" value={newAccount ? "회원가입!" : "로그인!"}/>
                {error && <span className="authError">{error}</span> }
            </form>
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "로그인으로 바꾸기" : "회원가입하러 가기"}</span>
        </div>
    )
}

export default  AuthForm
