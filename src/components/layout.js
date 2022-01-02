import React, { useEffect } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { auth, database } from '../firebase'
import { onValue, ref } from '@firebase/database';
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,

} from './layout.module.css'
import SideBar from './sidebar'
import { userAction, userSelector } from '../pages/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Layout = ({ pageTitle, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
        console.log(hasuraClaim);
        dispatch(userAction.isSignUpLoad(user));

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
        <title>{pageTitle} | {data.site.siteMetadata.title}</title>
        <SideBar></SideBar>
        {/* <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        <li className={navLinkItem}>
            <Link to="/blog" className={navLinkText}>
              Blog
            </Link>
          </li>
        </ul>
      </nav> */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout