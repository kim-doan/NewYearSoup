import React, { useState, useEffect } from "react";
import Layout from '../components/layout'
import { auth, database } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from '@firebase/database';
import { useDispatch } from "react-redux";
import { userAction } from "./auth/slice";

const IndexPage = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log(user)
                const idTokenResult = await user.getIdTokenResult();
                console.log(idTokenResult);
                const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

                console.log(hasuraClaim)
                if (hasuraClaim) {
                    console.log({ hasuraClaim });
                } else {
                    const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');
                    console.log(metadataRef)
                    onValue(metadataRef, async (snapshot) => {
                        if (snapshot.exists()) {
                            await user.getIdToken(true);
                            const idTokenResult = await user.getIdTokenResult();
                            const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
                            console.log(hasuraClaim);
                            console.log({ hasuraClaim });
                        }
                    })
                }
            }
        })
      }, []);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

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
        <section className="login">
            <div className="loginContainer">
                  <label>Username</label>      
                  <input
                      type="text"
                      authFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="errorMsg">{emailError}</p>
                  <label>Password</label>
                  <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="errorMsg">{passwordError}</p>
                  <div classNAme="btnContainer">
                      {hasAccount ? (
                          <>
                              <button onClick={handleLogin}>Sign in</button>
                              <p>Don't hav an accout ?
                                  <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                          </>
                      ): (
                          <>
                              <button onClick={handleSignup}>Sign up</button>
                                  <p>Have an account?
                                      <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                          </>    
                      )}
                      <button onClick={handleLogout}>logout</button>
                  </div>
            </div>
      </section>
    </Layout>
  )
}

export default IndexPage