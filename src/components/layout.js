import React, { useEffect } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { auth, database } from '../firebase'
import { onValue, ref } from '@firebase/database';
import { reload } from '@firebase/auth'
import {
  container,
} from './layout.module.css'
import SideBar from './sidebar'
import { userAction, userSelector } from '../reducers/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Layout = ({ pageTitle, children }) => {
  const dispatch = useDispatch();

  const isSignUp = useSelector(userSelector.isSignUp);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
        console.log(hasuraClaim);

        dispatch(userAction.isSignUpLoad(user));
        dispatch(userAction.setAuthUser(user));


        if (hasuraClaim) {
          axios.defaults.headers.common["x-hasura-allowed-roles"] = hasuraClaim["x-hasura-allowed-roles"];
          axios.defaults.headers.common["x-hasura-default-role"] = hasuraClaim["x-hasura-default-role"];
          axios.defaults.headers.common["x-hasura-user-id"] = hasuraClaim["x-hasura-user-id"];
          axios.defaults.headers.common["Authorization"] = "Bearer " + idTokenResult.token;
        } else {
          const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');
          console.log(metadataRef)
          onValue(metadataRef, async (snapshot) => {
            if (snapshot.exists()) {
              await user.getIdToken(true);
              const idTokenResult = await user.getIdTokenResult();
              const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

              axios.defaults.headers.common["x-hasura-allowed-roles"] = hasuraClaim["x-hasura-allowed-roles"];
              axios.defaults.headers.common["x-hasura-default-role"] = hasuraClaim["x-hasura-default-role"];
              axios.defaults.headers.common["x-hasura-user-id"] = hasuraClaim["x-hasura-user-id"];
              axios.defaults.headers.common["Authorization"] = "Bearer " + idTokenResult.token;
            }
          })
        }
      } else {
        dispatch(userAction.setAuthUser(null));
      }
    })
  }, []);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <div className={container}>
        <title>{data.site.siteMetadata.title}</title>
        <main>
          <SideBar></SideBar>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout