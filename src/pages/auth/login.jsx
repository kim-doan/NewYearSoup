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
                    setEmailError("이메일 양식에 맞지않아요.");
                    break;
                case "auth/user-disabled":
                    setEmailError("계정이 차단되었어요.");
                    break;
                case "auth/user-not-found":
                    setEmailError("가입내역을 찾을 수 없어요.");
                    break;
                case "auth/wrong-password":
                    setPasswordError("비밀번호가 틀렸어요.");
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
                    <label>비밀번호</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className={style.errorMsg}>{passwordError}</p>
                    <div className={style.btnContainer}>
                        <button onClick={handleLogin}>떡국 만들러가기</button>
                        <p>다른 서비스 계정으로 로그인</p>
                        <button className={style.serviceLogin} onClick={handleSignup}>구글 계정으로 로그인</button>
                        <button className={style.serviceLogin} onClick={handleSignup}>페이스북 계정으로 로그인</button>
                        {/* {hasAccount ? (
                            <>
                                <button onClick={handleLogin}>로그인</button>
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
                        <button onClick={handleLogout}>로그아웃</button> */}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default LoginPage