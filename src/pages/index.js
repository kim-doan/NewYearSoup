import React, { useState, useEffect } from "react";
import Layout from '../components/layout';
import { auth, database } from '../firebase';
import { onValue, ref } from '@firebase/database';
import { useDispatch } from "react-redux";
import * as style from "./index.module.css";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";

const IndexPage = () => {

  const startBtn = () => {
    if (auth.currentUser) {
      navigate(`/table/${auth.currentUser.uid}`)
    } else {
      navigate('/auth/login')
    }
  }

  return (
    <Layout>
      <section className={style.main}>
        <div className={style.mainContainer}>
          <div className={style.mainLogo}>
            <StaticImage
              src="../../assets/img/authLogo.png"
              alt="mainTitle"
              layout="constrained"
              width={180}
            />
          </div>
          <div className={style.buttonContainer}>
            <button onClick={startBtn}>시작하기</button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage