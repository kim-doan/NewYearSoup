import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase'
import Layout from '../../components/layout'
import { userAction } from "./slice";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as style from './register.module.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const RegisterPage = () => {
    const dispatch = useDispatch();

    // const [user, setUser] = useState(User);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    onAuthStateChanged(auth, (currentUser) => {
        // setUser(currentUser);

        console.log("test");
    });

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setNameError('');
        setPasswordError('');
        setPasswordConfirmError('');
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
    };

    const handleSignup = async () => {
        try {
            clearErrors();
            if (name.length < 2 && name.length > 6) {
                setNameError('닉네임을 2 ~ 6자 이내로 정해주세요.')
            }
            if (password !== passwordConfirm) {
                setPasswordConfirmError('비밀번호를 다시 확인해주세요.')
            }
            const result = await createUserWithEmailAndPassword(auth, email, password);

            result.user = {
                ...result.user,
                name,
            }

            dispatch(userAction.setProfile(result.user));
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setEmailError("이미 사용중인 이메일이에요.");
                    break;
                case "auth/invalid-email":
                    setEmailError("유효하지 않은 메일이에요.");
                    break;
                case "auth/user-not-found":
                    setEmailError("사용자 정보를 찾을 수 없어요.");
                    break;
                case "auth/weak-password":
                    setPasswordError("비밀번호는 6자리 이상의 문자가 필요해요.");
                    break;
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <Layout pageTitle="로그인">
            <section className={style.register}>
                <div className={style.registerContainer}>
                    <label>이메일</label>
                    <input
                        type="text"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="errorMsg">{emailError}</p>
                    <label>닉네임</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="errorMsg">{nameError}</p>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className={style.errorMsg}>{passwordError}</p>
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <p className={style.errorMsg}>{passwordConfirmError}</p>
                    <div className={style.btnContainer}>
                        <button onClick={handleSignup}>떡국 만들러가기</button>
                        <button className={style.outlineButton} onClick={handleLogin}>로그인 하러가기</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default RegisterPage