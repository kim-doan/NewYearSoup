import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase'
import Layout from '../../components/layout'
import { userAction } from "./slice";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as style from './login.module.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { graphql, navigate, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

        clearInputs();
    };

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleLogin();
        }
    }

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <Layout pageTitle="로그인">
            <section className={style.login}>
                <div className={style.loginContainer}>
                    <div className={style.authLogo}>
                        <StaticImage
                            src="../../../assets/img/authLogo.png"
                            alt="authLogo"
                            layout="constrained"
                            width={150}
                        />
                    </div>
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
                        <button onClick={handleLogin} onKeyPress={onKeyPress}>떡국 만들러가기</button>
                        <button className={style.outlineButton} onClick={() => { navigate("/auth/register") }}>회원가입 하러가기</button>
                        <p>다른 서비스 계정으로 로그인</p>
                        <button className={style.outlineButton} onClick={handleLogin}><FaGoogle /> 구글 계정으로 로그인</button>
                        <button className={style.outlineButton} onClick={handleLogin}><FaFacebook /> 페이스북 계정으로 로그인</button>
                        {/* <button onClick={handleLogout}>로그아웃</button> */}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default LoginPage