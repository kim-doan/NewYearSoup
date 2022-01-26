import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, faceBookprovider, provider } from '../../firebase'
import Layout from '../../components/layout'
import { userAction } from "../../reducers/auth/slice";
import { signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import * as style from './login.module.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { graphql, navigate, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { AuthAPI } from "../../api/auth";


const LoginPage = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        console.log(props);
    }, [props])

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
            const result = await signInWithEmailAndPassword(auth, email, password);

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

    useEffect(() => {
        console.log(progress)
    }, [progress])

    const googleLogin = () => {
        
        signInWithPopup(auth, provider).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            
            setProgress(true);

            const param = {
                userId : result.user.uid,
                userName : result.user.displayName,
                userEmail : result.user.email,
            }

            AuthAPI.addUser(param).then(() => {
                const state = props.location.state;
                
                if (state) {
                    const redirect = state.redirect;
                    navigate(redirect);
                } else {
                    navigate("/table/" + result.user.uid);
                }
                setProgress(false);
            })
        }).catch((error) => {
            console.log(error.code);
        })
    }

    const faceBookLogin = async () => {
        await signInWithPopup(auth, faceBookprovider).then((result) => {
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;

            setProgress(true);

            const param = {
                    userId : result.user.uid,
                    userName : result.user.displayName,
                    userEmail : result.user.email,
            }

            AuthAPI.addUser(param).then(() => {
                const state = props.location.state;

                if (state) {
                    const redirect = state.redirect;
                    navigate(redirect);
                } else {
                    navigate("/table/" + result.user.uid);
                }
                setProgress(false);
            })
        }).catch((error) => {
            console.log(error.code);
        })
    }

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
                {progress ? <div className="loader"></div> :
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
                            <button className={style.outlineButton} onClick={googleLogin}><FaGoogle /> 구글 계정으로 로그인</button>
                            <button className={style.outlineButton} onClick={faceBookLogin}><FaFacebook /> 페이스북 계정으로 로그인</button>
                            <button onClick={handleLogout}>로그아웃</button>
                        </div>
                    </div>
                }
            </section>
        </Layout>
    );
}

export default LoginPage