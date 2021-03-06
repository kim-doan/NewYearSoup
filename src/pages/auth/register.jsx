import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../../firebase'
import Layout from '../../components/layout'
import { userAction, userSelector } from "../../reducers/auth/slice";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import * as style from './register.module.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { navigate } from "gatsby";
import { AuthAPI } from "../../api/auth";

const RegisterPage = (props) => {
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

    const isSignUp = useSelector(userSelector.isSignUp);

    onAuthStateChanged(auth, (currentUser) => {
        // setUser(currentUser);
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
            const result = await signInWithEmailAndPassword(auth, email, password);

            if (result) {
                const param = {
                    userId: result.user.uid,
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                }
                AuthAPI.addUser(param).then(() => {
                    const state = props.location.state;

                    if (state) {
                        const redirect = state.redirect;
                        if (redirect) {
                            navigate(redirect);
                        } else {
                            navigate("/table/" + result.user.uid);
                        }
                    } else {
                        navigate("/table/" + result.user.uid);
                    }
                })
            }
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    setEmailError("????????? ????????? ???????????????.");
                    break;
                case "auth/user-disabled":
                    setEmailError("????????? ??????????????????.");
                    break;
                case "auth/user-not-found":
                    setEmailError("??????????????? ?????? ??? ?????????.");
                    break;
                case "auth/wrong-password":
                    setPasswordError("??????????????? ????????????.");
                    break;
            }
        }
    };

    const handleSignup = async () => {
        try {
            clearErrors();
            if (name.length < 2 && name.length > 6) {
                setNameError('???????????? 2 ~ 6??? ????????? ???????????????.')
                return;
            }
            if (password !== passwordConfirm) {
                setPasswordConfirmError('??????????????? ?????? ??????????????????.')
                return;
            }

            const result = await createUserWithEmailAndPassword(auth, email, password).then((user) => {
                return updateProfile(auth.currentUser,
                    {
                        displayName: name
                    }).then(() => {
                        return user;
                    })
            });

            dispatch(userAction.isSignUpLoad(result));

            if (result) {
                handleLogin();
            }
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setEmailError("?????? ???????????? ??????????????????.");
                    break;
                case "auth/invalid-email":
                    setEmailError("???????????? ?????? ???????????????.");
                    break;
                case "auth/user-not-found":
                    setEmailError("????????? ????????? ?????? ??? ?????????.");
                    break;
                case "auth/weak-password":
                    setPasswordError("??????????????? 6?????? ????????? ????????? ????????????.");
                    break;
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <Layout pageTitle="?????????">
            <section className={style.register}>
                <div className={style.registerContainer}>
                    <label>?????????</label>
                    <input
                        type="text"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="errorMsg">{emailError}</p>
                    <label>?????????</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="errorMsg">{nameError}</p>
                    <label>????????????</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className={style.errorMsg}>{passwordError}</p>
                    <label>???????????? ??????</label>
                    <input
                        type="password"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <p className={style.errorMsg}>{passwordConfirmError}</p>
                    <div className={style.btnContainer}>
                        <button onClick={handleSignup}>?????? ???????????????</button>
                        {/* <button className={style.outlineButton} onClick={() => { navigate("/auth/login") }}>????????? ????????????</button> */}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default RegisterPage