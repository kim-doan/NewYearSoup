import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import * as style from "./index.module.css";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";

const SponsorPage = () => {
    const LinkCopy = () => {
        // navigator.clipboard.writeText("https://qr.kakaopay.com/FEEaUo0AA").then(() => {
        //     alert("클립보드에 복사되었습니다. 감사합니다.")
        // });
        navigate("https://qr.kakaopay.com/FEEaUo0AA")
    }

    return (
        <Layout>
            <section className={style.main}>
                <div className={style.mainContainer}>
                    <div className={style.mainLogo} onClick={LinkCopy}>
                        <StaticImage
                            src="../../assets/img/Sponsor.png"
                            alt="Sponsor"
                            layout="constrained"
                            width={200}
                        />
                    </div>
                    <div className={style.buttonContainer}>
                        <button onClick={LinkCopy}>후원하기</button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default SponsorPage;