import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase'
import Layout from '../../components/layout'
import { userAction } from "./slice";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as style from './login.module.css';

const LoginPage = () => {
    const dispatch = useDispatch();

    // const [user, setUser] = useState(User);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = async () => {
        try {
            clearErrors();
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        }
    };

    const handleSignup = async () => {
        try {
            clearErrors();
            const result = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(userAction.setProfile(result.user));
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };
    
    return (
            <Layout pageTitle="Login">
            <section className={style.login}>
                    <div className={style.loginContainer}>
                        <label>이메일</label>
                        <input
                        
                            type="text"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="errorMsg">{emailError}</p>
                        <label>패스워드</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="errorMsg">{passwordError}</p>
                        <div className="btnContainer">
                            {hasAccount ? (
                                <>
                                    <button onClick={handleLogin}>Sign in</button>
                                    <p>Don't hav an accout ?
                                        <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleSignup}>회원가입</button>
                                    <p>Have an account?
                                        <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                </>
                            )}
                            <button onClick={handleLogout}>로그아웃</button>
                        </div>
                    </div>
                </section>
            </Layout>
    );
}

export default LoginPage