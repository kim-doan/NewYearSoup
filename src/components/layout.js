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

const Layout = ({ pageTitle, children }) => {

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